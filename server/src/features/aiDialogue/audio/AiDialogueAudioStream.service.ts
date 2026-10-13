import { randomUUID } from 'node:crypto'
import { Injectable, Logger } from '@nestjs/common'
import { AiDialogueAudioRepository } from 'repo/aiDialogue/aiDialogueAudio.repository'
import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { AiDialogueAudioGenerationQueue } from 'infrastructure/queues/aiDialogueAudioGeneration.queue'
import { openAITtsInputSchema } from 'infrastructure/ttsProviderAdapter/ttsInput.schema'
import { AiDialogueSseHub } from '../AiDialogueSseHub.service'
import { AI_DIALOGUE_NARRATOR, AI_DIALOGUE_TTS_MODEL, dialogueVoiceSchema } from './aiDialogueAudioConfig'
import { DialogueAudioCandidate, DialogueAudioLineParser } from './DialogueAudioLineParser'

export type AudioStreamSession = {
	id: string
	push(chunk: string): void
	finish(): Promise<void>
	cancel(): Promise<void>
	confirm(messageIds: number[], events: AiDialogueEvent[]): Promise<void>
}

@Injectable()
export class AiDialogueAudioStream {
	private readonly logger = new Logger(AiDialogueAudioStream.name)
	constructor(
		private readonly repository: AiDialogueAudioRepository,
		private readonly queue: AiDialogueAudioGenerationQueue,
		private readonly config: MainConfigService,
		private readonly hub: AiDialogueSseHub,
	) {}

	/** Serializes short persistence tasks in the background, never awaiting TTS or Redis from the text stream. */
	start(dialogueId: number, turnId: string): AudioStreamSession {
		const id = randomUUID()
		const parser = new DialogueAudioLineParser()
		let enabled = true

		let chain: Promise<unknown> = this.repository.startAttempt(id, turnId, dialogueId).catch(() => {
			enabled = false
			this.logger.warn('Audio attempt unavailable; text continues')
		})

		const scheduleTask = (task: () => Promise<unknown>) => {
			chain = chain.then(task).catch(() => this.logger.warn('Audio preparation failed; text continues'))
		}

		const schedule = (candidates: DialogueAudioCandidate[]) => {
			for (const { npcId, profile } of parser.takeVoices()) {
				scheduleTask(async () => {
					if (enabled) await this.repository.ensureVoice(dialogueId, npcId, profile)
				})
			}
			for (const candidate of candidates) {
				scheduleTask(async () => {
					if (enabled) await this.prepare(dialogueId, id, candidate)
				})
			}
		}
		const notify = () => this.hub.publishDialogueEvent(dialogueId, { data: { type: 'audioChanged', dialogueId } })

		this.hub.publishDialogueEvent(dialogueId, {
			data: { type: 'audioAttemptStarted', dialogueId, turnId, attemptId: id },
		})

		return {
			id,
			push: (chunk) => schedule(parser.push(chunk)),
			finish: async () => {
				schedule(parser.finish())
				await chain
			},
			cancel: async () => {
				enabled = false
				this.hub.publishDialogueEvent(dialogueId, {
					data: { type: 'audioAttemptCancelled', dialogueId, turnId, attemptId: id },
				})
				await chain
				await this.repository
					.cancelAttempt(id)
					.catch(() => this.logger.warn('Audio cancellation deferred to stale-attempt cleanup'))
				notify()
			},
			confirm: async (messageIds, events) => {
				await chain
				if (!enabled) return
				try {
					await this.repository.confirmAttempt(id, messageIds, events)
					notify()
				} catch {
					this.logger.warn('Audio binding failed; text continues')
				}
			},
		}
	}

	private async prepare(dialogueId: number, attemptId: string, candidate: DialogueAudioCandidate) {
		let profile = AI_DIALOGUE_NARRATOR

		if (candidate.npcId) {
			const existing = await this.repository.getVoice(dialogueId, candidate.npcId)
			const proposed = existing ?? candidate.voice
			const parsed = dialogueVoiceSchema.safeParse(
				proposed && { voice: proposed.voice, instructions: proposed.instructions },
			)
			if (!parsed.success) return
			profile = parsed.data
			if (!existing) {
				const saved = await this.repository.ensureVoice(dialogueId, candidate.npcId, parsed.data)
				profile = dialogueVoiceSchema.parse({ voice: saved.voice, instructions: saved.instructions })
			}
		}

		const input = openAITtsInputSchema.parse({
			type: 'OpenAI',
			model: AI_DIALOGUE_TTS_MODEL,
			text: candidate.text,
			voice: profile.voice,
			instructions: profile.instructions,
			speed: 1,
			responseFormat: 'mp3',
			timeoutMs: 60_000,
		})
		const { region, mode } = this.config.get()
		const key = `ai-dialogue-audio/generated/${region}/${mode}/${attemptId}/${randomUUID()}.mp3`
		const job = await this.repository.createJob(attemptId, candidate, input, key)
		if (!job) return

		this.hub.publishDialogueEvent(dialogueId, {
			data: {
				type: 'audioQueued',
				dialogueId,
				attemptId,
				audioId: job.id,
				eventIndex: job.event_index,
				actionIndex: job.action_index,
				npcId: job.npc_id,
			},
		})
		// The persisted job is its own outbox. Failed immediate delivery is repaired by the publisher.
		void this.queue
			.enqueue(job.id)
			.then(() => this.repository.markPublished(job.id))
			.catch(() => {
				this.logger.warn('Audio queue delivery deferred to outbox scan')
			})
	}
}
