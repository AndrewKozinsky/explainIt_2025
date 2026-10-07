import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueVisualsRepository } from 'repo/aiDialogue/aiDialogueVisuals.repository'
import { AiDialogueVisualsOutModel } from 'models/aiDialogue/aiDialogueVisuals.out.model'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { AI_DIALOGUE_USER_AVATAR_S3_KEY } from './aiDialogueVisualConfig'

export class GetAiDialogueVisualsCommand implements ICommand {
	constructor(
		public userId: number,
		public dialogueId: number,
	) {}
}

@CommandHandler(GetAiDialogueVisualsCommand)
export class GetAiDialogueVisualsHandler implements ICommandHandler<
	GetAiDialogueVisualsCommand,
	AiDialogueVisualsOutModel
> {
	constructor(
		private readonly repository: AiDialogueVisualsRepository,
		private readonly storage: CloudflareS3Service,
	) {}

	/** Проверяет владельца до подписания URL; выдаёт только публичные метаданные и временные ссылки. */
	async execute(command: GetAiDialogueVisualsCommand): Promise<AiDialogueVisualsOutModel> {
		const dialogue = await this.repository.getDialogueVisuals(command.dialogueId)
		if (!dialogue) throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
		if (dialogue.user_id !== command.userId)
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)

		// Signer grants six hours; advertise five to leave a margin for generation and clock skew.
		const urlsExpireAt = new Date(Date.now() + 5 * 60 * 60_000).toISOString()
		const mapImage = async (
			image: (typeof dialogue.AiDialogueCharacter)[number]['AiDialogueImage'][number] | undefined,
		) =>
			image
				? {
						id: image.id,
						url: await this.storage.getFileUrl(image.s3_key),
						mimeType: image.mime_type,
						width: image.width,
						height: image.height,
						layoutVersion: image.layout_version,
					}
				: null

		return {
			dialogueId: dialogue.id,
			urlsExpireAt,
			userAvatarUrl: await this.storage.getFileUrl(AI_DIALOGUE_USER_AVATAR_S3_KEY),
			characters: await Promise.all(
				dialogue.AiDialogueCharacter.map(async (character) => ({
					id: character.id,
					npcId: character.npc_id,
					name: character.name,
					role: character.role,
					generationStatus: character.ImageGenerationJob[0]?.status ?? null,
					emotionSheet: await mapImage(character.AiDialogueImage[0]),
				})),
			),
			scenes: await Promise.all(
				dialogue.AiDialogueMessage.map(async (message) => ({
					messageId: message.id,
					generationStatus: message.ImageGenerationJob[0]?.status ?? null,
					image: await mapImage(message.AiDialogueImage[0]),
				})),
			),
		}
	}
}
