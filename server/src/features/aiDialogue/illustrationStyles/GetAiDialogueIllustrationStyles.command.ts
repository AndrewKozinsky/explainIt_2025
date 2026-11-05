import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { AiDialogueIllustrationStylesOutModel } from 'models/aiDialogue/aiDialogueIllustrationStyles.out.model'
import {
	getAiDialogueIllustrationStyleCatalog,
	getAiDialogueIllustrationStylePreviewKey,
} from './aiDialogueIllustrationStyles'

/** Внутри окна ссылки на превью не меняются, и браузер берёт картинки из кэша. */
export const illustrationStylePreviewUrlWindowSeconds = 6 * 60 * 60
/** Клиенту рекомендуется перечитать каталог за час до окончания действия ссылок. */
const urlsRefreshMarginMs = 60 * 60 * 1000

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

		const signedStyles = await Promise.all(
			catalog.styles.map(async (style) => {
				const preview = await this.storage.getCacheableFileUrl(
					getAiDialogueIllustrationStylePreviewKey(mode, style.file),
					illustrationStylePreviewUrlWindowSeconds,
				)

				return { style: { id: style.id, titleKey: style.titleKey, previewUrl: preview.url }, preview }
			}),
		)

		const earliestExpiresAtMs = Math.min(...signedStyles.map(({ preview }) => preview.expiresAt.getTime()))

		return {
			defaultStyleId: catalog.defaultStyleId,
			styles: signedStyles.map(({ style }) => style),
			urlsExpireAt: new Date(earliestExpiresAtMs - urlsRefreshMarginMs).toISOString(),
		}
	}
}
