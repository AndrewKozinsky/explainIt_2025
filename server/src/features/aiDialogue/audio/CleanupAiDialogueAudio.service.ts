import { Injectable, Logger } from '@nestjs/common'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

/** Удаляет файлы озвучки удалённого диалога из R2. Записи в БД к этому моменту уже удалены каскадом. */
@Injectable()
export class CleanupAiDialogueAudio {
	private readonly prefix: string
	private readonly logger = new Logger(CleanupAiDialogueAudio.name)

	constructor(
		private readonly storage: CloudflareS3Service,
		config: MainConfigService,
	) {
		const { region, mode } = config.get()
		this.prefix = `ai-dialogue-audio/generated/${region}/${mode}/`
	}

	async deleteFiles(s3Keys: string[]) {
		for (const s3Key of new Set(s3Keys)) {
			if (!s3Key.startsWith(this.prefix)) continue

			try {
				await this.storage.deleteFile(s3Key, 10_000)
			} catch {
				this.logger.warn('Audio file deletion failed; object retained')
			}
		}
	}
}
