import { Injectable, Logger } from '@nestjs/common'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { getR2EnvironmentPrefix } from 'infrastructure/cloudflareS3/r2EnvironmentPrefix'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { AI_DIALOGUE_AUDIO_STORAGE_PATH } from './aiDialogueAudioConfig'

/** Удаляет файлы озвучки удалённого диалога из R2. Записи в БД к этому моменту уже удалены каскадом. */
@Injectable()
export class CleanupAiDialogueAudio {
	private readonly prefixes: string[]
	private readonly logger = new Logger(CleanupAiDialogueAudio.name)

	constructor(
		private readonly storage: CloudflareS3Service,
		config: MainConfigService,
	) {
		const { region, mode } = config.get()
		this.prefixes = [
			getR2EnvironmentPrefix(AI_DIALOGUE_AUDIO_STORAGE_PATH, mode),
			getR2EnvironmentPrefix(`${AI_DIALOGUE_AUDIO_STORAGE_PATH}/generated/${region}`, mode),
		]
	}

	async deleteFiles(s3Keys: string[]) {
		for (const s3Key of new Set(s3Keys)) {
			const isAudioKey = this.prefixes.some(
				(prefix) => s3Key.startsWith(prefix) && /^[1-9]\d*\/[^/]+\.mp3$/.test(s3Key.slice(prefix.length)),
			)
			if (!isAudioKey) continue

			try {
				await this.storage.deleteFile(s3Key, 10_000)
			} catch {
				this.logger.warn('Audio file deletion failed; object retained')
			}
		}
	}
}
