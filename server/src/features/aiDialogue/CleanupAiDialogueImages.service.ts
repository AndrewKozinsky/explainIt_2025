import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { AiDialogueImageCleanupRepository } from 'repo/aiDialogue/aiDialogueImageCleanup.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import {
	AI_DIALOGUE_STYLE_AVATAR_REFERENCE_S3_KEY,
	AI_DIALOGUE_STYLE_SCENE_REFERENCE_S3_KEY,
	AI_DIALOGUE_USER_AVATAR_S3_KEY,
} from './aiDialogueVisualConfig'
import {
	GENERATED_DIALOGUE_IMAGES_PREFIX,
	getGeneratedDialogueImageJobId,
	getGeneratedDialogueImagesPrefix,
} from './imageGeneration/generatedDialogueImageKey'

const ORPHAN_GRACE_MS = 24 * 60 * 60_000

@Injectable()
export class CleanupAiDialogueImages implements OnModuleDestroy {
	private readonly logger = new Logger(CleanupAiDialogueImages.name)
	private continuationToken?: string
	private scanning = false
	private stopped = false
	private readonly generatedPrefix: string
	constructor(
		private readonly repository: AiDialogueImageCleanupRepository,
		private readonly storage: CloudflareS3Service,
		config: MainConfigService,
	) {
		this.generatedPrefix = getGeneratedDialogueImagesPrefix(config.get())
	}

	/**
	 * Удаляет известные файлы после коммита удаления диалога, не меняя результат успешного DELETE при сбое R2.
	 * Неудачные удаления новых scoped-ключей повторяет обход R2; старые ключи требуют ручного повтора.
	 * Дубликаты ключей внутри пачки обрабатываются один раз.
	 * @param keys Ключи, прочитанные из БД до каскадного удаления записей.
	 */
	async cleanupDeletedDialogueImages(keys: string[]): Promise<void> {
		for (const key of new Set(keys)) {
			if (this.stopped) break
			await this.deleteUnreferencedGeneratedImage(key)
		}
	}

	/**
	 * Обходит одну страницу generated-префикса и удаляет непривязанные исходники старше суток.
	 * Курсор сохраняется между проходами; конец обхода или ошибка listing начинают следующий цикл с начала.
	 */
	@Interval(30_000)
	async cleanupOrphanedImages(): Promise<void> {
		if (this.stopped || this.scanning) return
		this.scanning = true

		try {
			const page = await this.storage.listFilesByPrefix(this.generatedPrefix, this.continuationToken, 25)
			for (const object of page.Contents ?? []) {
				if (this.stopped) break
				const modifiedAt = object.LastModified?.getTime()
				if (
					!object.Key?.startsWith(this.generatedPrefix) ||
					modifiedAt === undefined ||
					!Number.isFinite(modifiedAt) ||
					modifiedAt > Date.now() - ORPHAN_GRACE_MS
				)
					continue
				await this.deleteUnreferencedGeneratedImage(object.Key)
			}
			this.continuationToken = page.IsTruncated ? page.NextContinuationToken : undefined
		} catch {
			this.continuationToken = undefined
			this.logger.warn('Dialogue image cleanup listing failed; retrying on the next scan')
		} finally {
			this.scanning = false
		}
	}

	/** Прекращает новые проходы и удаление следующего объекта; уже отправленный запрос может завершиться. */
	onModuleDestroy(): void {
		this.stopped = true
	}

	/** Проверяет область ключа и использование в БД перед DeleteObject; при любой неопределённости сохраняет файл. */
	private async deleteUnreferencedGeneratedImage(key: string): Promise<void> {
		const jobId = getGeneratedDialogueImageJobId(key)
		if (!key.startsWith(this.generatedPrefix) && !key.startsWith(`${GENERATED_DIALOGUE_IMAGES_PREFIX}job-`)) return
		const sharedKeys = [
			AI_DIALOGUE_USER_AVATAR_S3_KEY,
			AI_DIALOGUE_STYLE_AVATAR_REFERENCE_S3_KEY,
			AI_DIALOGUE_STYLE_SCENE_REFERENCE_S3_KEY,
		]
		if (jobId === null || sharedKeys.includes(key)) return
		try {
			if (await this.repository.isGeneratedImageInUse(key, jobId)) return
			if (!this.stopped) await this.storage.deleteFile(key, 10_000)
		} catch {
			this.logger.warn('Dialogue image cleanup failed; file retained')
		}
	}
}
