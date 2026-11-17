import { Injectable, Logger } from '@nestjs/common'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { getR2EnvironmentPrefix } from 'infrastructure/cloudflareS3/r2EnvironmentPrefix'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { AI_DIALOGUE_AUDIO_STORAGE_PATH, isAiDialogueAudioKey } from './aiDialogueAudioConfig'

/** Удаляет файлы озвучки удалённого диалога из R2. Записи в БД к этому моменту уже удалены каскадом. */
@Injectable()
export class CleanupAiDialogueAudio {
	private readonly prefix: string
	private readonly logger = new Logger(CleanupAiDialogueAudio.name)

	constructor(
		private readonly storage: CloudflareS3Service,
		config: MainConfigService,
	) {
		this.prefix = getR2EnvironmentPrefix(AI_DIALOGUE_AUDIO_STORAGE_PATH, config.get().mode)
	}

	async deleteFiles(s3Keys: string[]) {
		for (const s3Key of new Set(s3Keys)) {
			if (!isAiDialogueAudioKey(s3Key, this.prefix)) continue

			try {
				await this.storage.deleteFile(s3Key, 10_000)
			} catch {
				this.logger.warn('Audio file deletion failed; object retained')
			}
		}
	}
}
