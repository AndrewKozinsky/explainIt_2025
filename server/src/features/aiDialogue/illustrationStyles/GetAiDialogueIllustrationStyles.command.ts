import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { AiDialogueIllustrationStylesOutModel } from 'models/aiDialogue/aiDialogueIllustrationStyles.out.model'
import {
	getAiDialogueIllustrationStyleCatalog,
	getAiDialogueIllustrationStyleKey,
} from './aiDialogueIllustrationStyles'

export class GetAiDialogueIllustrationStylesCommand implements ICommand {}

@CommandHandler(GetAiDialogueIllustrationStylesCommand)
export class GetAiDialogueIllustrationStylesHandler implements ICommandHandler<GetAiDialogueIllustrationStylesCommand> {
	constructor(
		private storage: CloudflareS3Service,
		private config: MainConfigService,
	) {}

	async execute(): Promise<AiDialogueIllustrationStylesOutModel> {
		const catalog = getAiDialogueIllustrationStyleCatalog()
		const mode = this.config.get().mode
		const urlsExpireAt = new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString()
		const styles = await Promise.all(
			catalog.styles.map(async (style) => ({
				id: style.id,
				titleKey: style.titleKey,
				previewUrl: await this.storage.getFileUrl(getAiDialogueIllustrationStyleKey(mode, style.file)),
			})),
		)

		return { defaultStyleId: catalog.defaultStyleId, styles, urlsExpireAt }
	}
}
