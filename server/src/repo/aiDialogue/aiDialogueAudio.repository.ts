import { Injectable } from '@nestjs/common'
import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { PrismaService } from 'db/prisma.service'
import { DialogueVoice } from 'features/aiDialogue/audio/aiDialogueAudioConfig'
import { DialogueAudioCandidate } from 'features/aiDialogue/audio/DialogueAudioLineParser'
import { OpenAITtsInput } from 'infrastructure/ttsProviderAdapter/TtsProvider.interface'

@Injectable()
export class AiDialogueAudioRepository {
	constructor(private readonly prisma: PrismaService) {}

	startAttempt(id: string, turnId: string, dialogueId: number) {
		return this.prisma.aiDialogueAudioAttempt.create({ data: { id, turn_id: turnId, dialogue_id: dialogueId } })
	}

	getVoice(dialogueId: number, npcId: string) {
		return this.prisma.aiDialogueVoice.findUnique({
			where: { dialogue_id_npc_id: { dialogue_id: dialogueId, npc_id: npcId } },
		})
	}

	/** Empty update ensures a returning NPC never changes its original voice, including concurrent deliveries. */
	ensureVoice(dialogueId: number, npcId: string, voice: DialogueVoice) {
		return this.prisma.aiDialogueVoice.upsert({
			where: { dialogue_id_npc_id: { dialogue_id: dialogueId, npc_id: npcId } },
			create: { dialogue_id: dialogueId, npc_id: npcId, ...voice },
			update: {},
		})
	}

	async createJob(attemptId: string, candidate: DialogueAudioCandidate, input: OpenAITtsInput, key: string) {
		const position = {
			attempt_id: attemptId,
			event_index: candidate.eventIndex,
			action_index: candidate.actionIndex,
		}
		return this.prisma.$transaction(async (tx) => {
			const attempt = await tx.aiDialogueAudioAttempt.findUnique({ where: { id: attemptId } })
			if (!attempt || attempt.status !== 'active') return null
			return tx.aiDialogueAudioJob.upsert({
				where: { attempt_id_event_index_action_index: position },
				create: {
					attempt_id: attemptId,
					event_index: candidate.eventIndex,
					action_index: candidate.actionIndex,
					npc_id: candidate.npcId,
					text: candidate.text,
					input: JSON.stringify(input),
					s3_key: key,
				},
				update: {},
			})
		})
	}

	async cancelAttempt(id: string) {
		await this.prisma.$transaction(async (tx) => {
			await tx.aiDialogueAudioAttempt.updateMany({ where: { id }, data: { status: 'cancelled' } })
			await tx.aiDialogueAudioJob.updateMany({ where: { attempt_id: id }, data: { status: 'cancelled' } })
		})
	}

	/** Match early candidates to authoritative parsed text; malformed/dropped blocks never acquire a message ID. */
	async confirmAttempt(id: string, messageIds: number[], events: AiDialogueEvent[]) {
		await this.prisma.$transaction(async (tx) => {
			const jobs = await tx.aiDialogueAudioJob.findMany({
				where: { attempt_id: id },
				orderBy: [{ event_index: 'asc' }, { action_index: 'asc' }],
			})

			const usedEvents = new Set<number>()
			const matchedBlocks = new Map<number, number>()

			for (const job of jobs) {
				let index = matchedBlocks.get(job.event_index)
				if (index === undefined)
					index = events.findIndex((event, i) => !usedEvents.has(i) && matchesAudio(event, job))
				if (index < 0 || !matchesAudio(events[index], job)) {
					await tx.aiDialogueAudioJob.update({ where: { id: job.id }, data: { status: 'cancelled' } })
					continue
				}
				matchedBlocks.set(job.event_index, index)
				usedEvents.add(index)

				await tx.aiDialogueAudioJob.update({ where: { id: job.id }, data: { message_id: messageIds[index] } })
			}

			await tx.aiDialogueAudioAttempt.updateMany({
				where: { id, status: 'active' },
				data: { status: 'confirmed' },
			})
		})
	}

	pendingJobs() {
		return this.prisma.aiDialogueAudioJob.findMany({
			where: { published_at: null, status: 'queued', attempt: { status: { not: 'cancelled' } } },
			select: { id: true },
			take: 25,
			orderBy: { id: 'asc' },
		})
	}
	markPublished(id: number) {
		return this.prisma.aiDialogueAudioJob.updateMany({ where: { id }, data: { published_at: new Date() } })
	}
	getJob(id: number) {
		return this.prisma.aiDialogueAudioJob.findUnique({ where: { id }, include: { attempt: true } })
	}
	claim(id: number) {
		return this.prisma.aiDialogueAudioJob.updateMany({
			where: { id, status: 'queued', attempt: { status: { not: 'cancelled' } } },
			data: { status: 'generating', submitted_at: new Date() },
		})
	}
	setStatus(id: number, status: 'ready' | 'failed' | 'outcomeUnknown', error: string | null = null) {
		return this.prisma.aiDialogueAudioJob.updateMany({
			where: { id, status: { in: ['generating', 'outcomeUnknown'] }, attempt: { status: { not: 'cancelled' } } },
			data: { status, error },
		})
	}
	getSnapshot(dialogueId: number) {
		return this.prisma.aiDialogue.findUnique({
			where: { id: dialogueId },
			select: {
				id: true,
				user_id: true,
				AiDialogueAudioAttempt: {
					orderBy: { created_at: 'asc' },
					include: { AiDialogueAudioJob: { orderBy: [{ event_index: 'asc' }, { action_index: 'asc' }] } },
				},
			},
		})
	}
	/** Repair the window after the text transaction committed but the HTTP process did not bind audio. */
	async recoverBindings() {
		const attempts = await this.prisma.aiDialogueAudioAttempt.findMany({
			where: {
				status: 'active',
				message_ids: { not: null },
				updated_at: { lt: new Date(Date.now() - 15 * 60_000) },
			},
			take: 25,
		})
		for (const attempt of attempts) {
			const ids: number[] = JSON.parse(attempt.message_ids!)
			const messages = await this.prisma.aiDialogueMessage.findMany({
				where: { id: { in: ids }, dialogue_id: attempt.dialogue_id },
			})
			const byId = new Map(messages.map((message) => [message.id, message]))
			const events = ids.map((id) => {
				const message = byId.get(id)
				return message ? ({ type: message.type, ...JSON.parse(message.payload) } as AiDialogueEvent) : undefined
			})
			if (events.some((event) => !event)) {
				await this.cancelAttempt(attempt.id)
				continue
			}

			await this.confirmAttempt(attempt.id, ids, events as AiDialogueEvent[])
		}
		return attempts
	}

	async expireAttempts() {
		const stale = await this.prisma.aiDialogueAudioAttempt.findMany({
			where: { status: 'active', message_ids: null, updated_at: { lt: new Date(Date.now() - 15 * 60_000) } },
			select: { id: true, dialogue_id: true },
			take: 25,
		})
		for (const attempt of stale) await this.cancelAttempt(attempt.id)
		return stale
	}
	async isKeyReferenced(key: string) {
		return !!(await this.prisma.aiDialogueAudioJob.findFirst({
			where: {
				s3_key: key,
				status: { notIn: ['failed', 'cancelled'] },
				attempt: { status: { not: 'cancelled' } },
			},
			select: { id: true },
		}))
	}
}

function matchesAudio(
	event: AiDialogueEvent | undefined,
	job: { npc_id: string | null; text: string; action_index: number },
) {
	if (event?.type === 'sceneUpdate')
		return job.action_index === -1 && job.npc_id === null && job.text === event.content
	return (
		event?.type === 'npcActions' &&
		event.npcId === job.npc_id &&
		event.actions[job.action_index]?.type === 'speech' &&
		event.actions[job.action_index]?.content === job.text
	)
}
