import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { AiDialogueAudioRepository } from 'repo/aiDialogue/aiDialogueAudio.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

@Injectable()
export class CleanupAiDialogueAudio implements OnModuleDestroy {
	private cursor?: string
	private busy = false
	private stopped = false
	private readonly prefix: string
	private readonly logger = new Logger(CleanupAiDialogueAudio.name)

	constructor(
		private readonly repository: AiDialogueAudioRepository,
		private readonly storage: CloudflareS3Service,
		config: MainConfigService,
	) {
		const { region, mode } = config.get()
		this.prefix = `ai-dialogue-audio/generated/${region}/${mode}/`
	}

	@Interval(30_000)
	async scan() {
		if (this.stopped || this.busy) return
		this.busy = true

		try {
			const page = await this.storage.listFilesByPrefix(this.prefix, this.cursor, 25)
			for (const object of page.Contents ?? []) {
				if (this.stopped) break
				if (
					!object.Key?.startsWith(this.prefix) ||
					!object.LastModified ||
					object.LastModified.getTime() > Date.now() - 24 * 60 * 60_000
				)
					continue
				if (!(await this.repository.isKeyReferenced(object.Key)))
					await this.storage.deleteFile(object.Key, 10_000)
			}

			this.cursor = page.IsTruncated ? page.NextContinuationToken : undefined
		} catch {
			this.cursor = undefined
			this.logger.warn('Audio cleanup deferred; objects retained')
		} finally {
			this.busy = false
		}
	}
	async deleteFiles(keys: string[]) {
		for (const key of new Set(keys)) {
			if (this.stopped) return
			if (!key.startsWith(this.prefix)) continue
			try {
				if (!(await this.repository.isKeyReferenced(key))) await this.storage.deleteFile(key, 10_000)
			} catch {
				this.logger.warn('Audio deletion deferred to orphan scan')
			}
		}
	}
	onModuleDestroy() {
		this.stopped = true
	}
}
