import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueAudioRepository } from 'repo/aiDialogue/aiDialogueAudio.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { AiDialogueAudioItemOutModel, AiDialogueAudioOutModel } from 'models/aiDialogue/aiDialogueAudio.out.model'

type AudioRow = NonNullable<Awaited<ReturnType<AiDialogueAudioRepository['getJob']>>>

/** Shared public mapping: no text, instructions, storage keys, errors or credentials are exposed. */
export async function mapDialogueAudio(
	job: AudioRow,
	storage: CloudflareS3Service,
): Promise<AiDialogueAudioItemOutModel> {
	const ready = job.status === 'ready' && job.attempt.status !== 'cancelled'

	return {
		id: job.id,
		attemptId: job.attempt_id,
		turnId: job.attempt.turn_id,
		attemptStatus: job.attempt.status,
		messageId: job.message_id,
		eventIndex: job.event_index,
		actionIndex: job.action_index,
		npcId: job.npc_id,
		status: job.attempt.status === 'cancelled' ? 'cancelled' : job.status,
		url: ready ? await storage.getFileUrl(job.s3_key) : null,
		mimeType: 'audio/mpeg',
		urlsExpireAt: ready ? new Date(Date.now() + 5 * 60 * 60_000).toISOString() : null,
	}
}

export class GetAiDialogueAudioCommand implements ICommand {
	constructor(
		public userId: number,
		public dialogueId: number,
	) {}
}

@CommandHandler(GetAiDialogueAudioCommand)
export class GetAiDialogueAudioHandler implements ICommandHandler<GetAiDialogueAudioCommand, AiDialogueAudioOutModel> {
	constructor(
		private readonly repository: AiDialogueAudioRepository,
		private readonly storage: CloudflareS3Service,
	) {}

	async execute(command: GetAiDialogueAudioCommand): Promise<AiDialogueAudioOutModel> {
		const dialogue = await this.repository.getSnapshot(command.dialogueId)
		if (!dialogue) throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
		if (dialogue.user_id !== command.userId)
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)

		const items = await Promise.all(
			dialogue.AiDialogueAudioAttempt.flatMap((attempt) =>
				attempt.AiDialogueAudioJob.map((job) => mapDialogueAudio({ ...job, attempt }, this.storage)),
			),
		)

		return {
			dialogueId: dialogue.id,
			attempts: dialogue.AiDialogueAudioAttempt.map((attempt) => ({
				id: attempt.id,
				turnId: attempt.turn_id,
				status: attempt.status,
			})),
			items,
		}
	}
}
