import { randomUUID } from 'node:crypto'
import { Injectable } from '@nestjs/common'
import { ImageGenerationAssetsRepository } from 'repo/aiDialogue/imageGenerationAssets.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { ImageGenerationJob } from 'prisma/generated/client'
import { AI_DIALOGUE_EMOTION_LAYOUT_VERSION } from '../aiDialogueVisualConfig'
import { ImageGenerationSnapshot, parseImageGenerationSnapshot } from './buildImageGenerationPrompt'
import {
	assertDialogueImageRatio,
	dialogueImageReference,
	inspectDialogueImage,
	neutralNpcReference,
} from './dialogueImageFiles'
import { getGeneratedDialogueImageJobId, getGeneratedDialogueImagesPrefix } from './generatedDialogueImageKey'
import { ImageGenerationAssets } from './ImageGenerationAssets'

@Injectable()
export class R2ImageGenerationAssets extends ImageGenerationAssets {
	constructor(
		private readonly repository: ImageGenerationAssetsRepository,
		private readonly storage: CloudflareS3Service,
		private readonly config: MainConfigService,
	) {
		super()
	}

	/** Reserve a unique immutable destination; the repository persists it before calling OpenAI. */
	createResultKey(job: ImageGenerationJob, snapshot: ImageGenerationSnapshot): string {
		const extension = snapshot.format === 'jpeg' ? 'jpg' : snapshot.format
		return `${getGeneratedDialogueImagesPrefix(this.config.get())}job-${job.id}/${randomUUID()}.${extension}`
	}

	/** Finish publication from R2 after restart or a lost PUT/DB acknowledgement, never regenerate.
	 * Only an authoritative 404 means absent. Permission/network errors propagate for storage retries. */
	async publishStoredResult(job: ImageGenerationJob): Promise<boolean> {
		const snapshot = parseImageGenerationSnapshot(job.type, job.input)
		if (!snapshot.resultS3Key) return false
		const key = this.resultKey(job, snapshot)
		let bytes: Buffer

		try {
			bytes = await this.storage.readFile(key)
		} catch (error) {
			if (
				error &&
				typeof error === 'object' &&
				'$metadata' in error &&
				(error.$metadata as { httpStatusCode?: number })?.httpStatusCode === 404
			)
				return false
			throw error
		}
		await this.publish(job, { bytes, contentType: null }, true)

		return true
	}

	/**
	 * Читает приватные объекты R2 и готовит data URI для сохранённого снимка задания.
	 * Для сцены порядок: пользователь, нейтральные ячейки NPC, необязательный эталон стиля.
	 * Проверяет владельца сцены и соответствие NPC; для спрайта загружает только эталон стиля.
	 * @param job Задание с идентификатором сообщения-владельца сцены.
	 * @param snapshot Проверенный снимок параметров генерации, а не текущая конфигурация.
	 * @returns Референсы либо null, если требуемый спрайт NPC ещё генерируется.
	 * @throws При неверном владельце, недоступной зависимости, превышении лимита или ошибке чтения/декодирования.
	 */
	async prepareReferences(job: ImageGenerationJob, snapshot: ImageGenerationSnapshot): Promise<string[] | null> {
		if ('appearance' in snapshot) {
			return snapshot.styleAvatarReferenceS3Key
				? [await this.readReference(snapshot.styleAvatarReferenceS3Key)]
				: []
		}
		const message = job.message_id ? await this.repository.findSceneMessage(job.message_id) : null
		if (!message || message.type !== 'sceneUpdate' || message.dialogue_id !== snapshot.dialogueId)
			throw new Error('Scene owner does not match the job snapshot')
		if (snapshot.participantCharacterIds.length + 1 + Number(Boolean(snapshot.styleSceneReferenceS3Key)) > 16)
			throw new Error('Too many scene references for OpenAI')

		const characters = await this.repository.findCharacters(snapshot.dialogueId, snapshot.participantCharacterIds)
		const sheets: string[] = []

		for (let index = 0; index < snapshot.participantCharacterIds.length; index += 1) {
			const character = characters.find((item) => item.id === snapshot.participantCharacterIds[index])
			if (!character || character.npc_id !== snapshot.participantNpcIds[index])
				throw new Error('Scene NPC does not belong to the saved dialogue')

			const sheet = character.AiDialogueImage.find(
				(image) => image.layout_version === AI_DIALOGUE_EMOTION_LAYOUT_VERSION,
			)
			if (sheet) {
				sheets.push(sheet.s3_key)
				continue
			}
			if (
				!character.ImageGenerationJob.length ||
				character.ImageGenerationJob.every((item) => item.status === 'failed' || item.status === 'ready')
			)
				throw new Error('NPC emotion sheet dependency is unavailable')
			return null
		}

		const images = [await this.readReference(snapshot.userAvatarS3Key)]
		for (const key of sheets) images.push(await neutralNpcReference(await this.storage.readFile(key)))
		if (snapshot.styleSceneReferenceS3Key) images.push(await this.readReference(snapshot.styleSceneReferenceS3Key))

		return images
	}

	/**
	 * Проверяет исходник, загружает неизменённые байты в R2 и атомарно публикует изображение в БД.
	 * Повторно читает задание; удалённые и ready/failed пропускает. Ключ зарезервирован до генерации.
	 * При откате/неопределённом коммите сохраняет файл для восстановления публикации без повторной оплаты.
	 * @param job Задание, для которого получен исходник.
	 * @param result Исходные байты и заявленный MIME; при null формат определяется по содержимому.
	 * @throws При неверном состоянии/файле или сбое R2/БД. Повторять можно только публикацию сохранённого файла.
	 */
	async publish(
		job: ImageGenerationJob,
		result: { bytes: Buffer; contentType: string | null },
		stored = false,
	): Promise<void> {
		const current = await this.repository.findJob(job.id)
		if (!current || current.status === 'ready' || current.status === 'failed') return
		if (current.status !== 'generating') throw new Error('Image generation job is not generating')
		const snapshot = parseImageGenerationSnapshot(current.type, current.input)
		const metadata = await inspectDialogueImage(result.bytes, result.contentType)
		assertDialogueImageRatio(metadata.width, metadata.height, snapshot.aspectRatio === '4:3' ? 4 / 3 : 2)
		if (metadata.width !== snapshot.size.width || metadata.height !== snapshot.size.height)
			throw new Error('Dialogue image pixel size mismatch')
		const key = this.resultKey(current, snapshot)
		if (!key.endsWith(`.${metadata.extension}`)) throw new Error('Dialogue image output format mismatch')
		if (!stored) await this.storage.uploadFile(key, result.bytes, metadata.mime, 60_000)

		let committed: boolean
		try {
			committed = await this.repository.saveImageAndMarkJobReady(current, {
				...metadata,
				s3Key: key,
				layoutVersion: 'appearance' in snapshot ? snapshot.layoutVersion : null,
			})
		} catch (error) {
			// A lost commit acknowledgement does not prove rollback. Retain the file if DB cannot answer.
			if (await this.repository.findImage(key)) return
			await this.cleanupDeletedResult(current, key)
			throw error
		}
		if (!(await this.repository.findImage(key))) {
			await this.cleanupDeletedResult(current, key)
			if (!committed) throw new Error('Image publication did not commit')
		}
	}

	/** Never remove a recoverable original belonging to an active job, or another publisher's committed image. */
	private async cleanupDeletedResult(job: ImageGenerationJob, key: string): Promise<void> {
		const current = await this.repository.findJob(job.id)
		if (!current || current.status === 'failed') await this.storage.deleteFile(key, 10_000)
	}

	/** Only own reserved generated objects can be read or written during recovery. */
	private resultKey(job: ImageGenerationJob, snapshot: ImageGenerationSnapshot): string {
		const key = snapshot.resultS3Key
		const extension = snapshot.format === 'jpeg' ? 'jpg' : snapshot.format
		if (
			!key ||
			!key.startsWith(getGeneratedDialogueImagesPrefix(this.config.get())) ||
			getGeneratedDialogueImageJobId(key) !== job.id ||
			!key.endsWith(`.${extension}`)
		)
			throw new Error('Invalid reserved image result key')
		return key
	}

	/**
	 * Читает и проверяет референс из R2 без изменения его исходных байтов.
	 * @param key Ключ объекта внутри настроенного бакета.
	 * @returns Data URI с фактическим MIME изображения.
	 */
	private async readReference(key: string): Promise<string> {
		return dialogueImageReference(await this.storage.readFile(key))
	}
}
