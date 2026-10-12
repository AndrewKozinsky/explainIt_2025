import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { UserProfileRepository } from 'repo/userProfile.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { getUserAvatarUploadPrefix, isUserAvatarUploadKey } from './userAvatarConfig'

const ORPHAN_GRACE_MS = 24 * 60 * 60_000

@Injectable()
export class CleanupUserAvatars implements OnModuleDestroy {
	private readonly logger = new Logger(CleanupUserAvatars.name)
	private readonly prefix: string
	private continuationToken?: string
	private scanning = false
	private stopped = false

	constructor(
		private readonly repository: UserProfileRepository,
		private readonly storage: CloudflareS3Service,
		config: MainConfigService,
	) {
		this.prefix = getUserAvatarUploadPrefix(config.get())
	}

	/** Only confirmed superseded photos are eligible for immediate cleanup. */
	async cleanupReplacedPhoto(key: string | null): Promise<void> {
		if (!key || this.stopped || !isUserAvatarUploadKey(key, this.prefix)) return

		try {
			if (await this.repository.isAvatarInUse(key)) return
			if (!this.stopped) await this.storage.deleteFile(key, 10_000)
		} catch {
			this.logger.warn('Avatar cleanup failed; file retained for a later scan')
		}
	}

	/** Recover failed uploads, uncertain commits, user deletions and interrupted replacements. */
	@Interval(30_000)
	async cleanupOrphanedPhotos(): Promise<void> {
		if (this.scanning || this.stopped) return
		this.scanning = true

		try {
			const page = await this.storage.listFilesByPrefix(this.prefix, this.continuationToken, 25)

			for (const object of page.Contents ?? []) {
				if (this.stopped) break

				const modifiedAt = object.LastModified?.getTime()
				if (!object.Key || modifiedAt === undefined || !Number.isFinite(modifiedAt)) continue
				if (modifiedAt > Date.now() - ORPHAN_GRACE_MS) continue

				await this.cleanupReplacedPhoto(object.Key)
			}

			this.continuationToken = page.IsTruncated ? page.NextContinuationToken : undefined
		} catch {
			this.continuationToken = undefined
			this.logger.warn('Avatar cleanup listing failed; retrying on the next scan')
		} finally {
			this.scanning = false
		}
	}

	onModuleDestroy(): void {
		this.stopped = true
	}
}
