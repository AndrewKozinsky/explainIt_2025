import { Injectable } from '@nestjs/common'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { inspectDialogueImage, inspectDialoguePreviewImage } from './dialogueImageFiles'

export type DialogueSharedImageKeys = Record<string, string | null>

export type DialogueSharedImageCheck = {
	asset: keyof DialogueSharedImageKeys
	key: string | null
	status: 'ready' | 'unconfigured' | 'unavailable' | 'invalid'
	width?: number
	height?: number
	mime?: string
}

@Injectable()
export class CheckAiDialogueImageAssets {
	constructor(private readonly storage: CloudflareS3Service) {}

	/**
	 * Читает и декодирует эталоны и превью стилей без записи в R2, БД и вызова генератора.
	 * Ошибки отдельных объектов не прерывают остальные проверки и не раскрывают ответы SDK/секреты.
	 * @param keys Именованные эталоны текущего каталога для проверяемого MODE.
	 * @param previewKeys Именованные лёгкие превью для переключателя; проверяются без минимальных габаритов.
	 * @returns Готовность всех файлов и безопасный отчёт с фактическими размерами/форматом.
	 */
	async checkSharedImageAssets(
		keys: DialogueSharedImageKeys,
		previewKeys: DialogueSharedImageKeys = {},
	): Promise<{ ready: boolean; assets: DialogueSharedImageCheck[] }> {
		const assets: DialogueSharedImageCheck[] = []

		for (const asset of Object.keys(keys)) {
			assets.push(await this.checkSharedImage(asset, keys[asset], inspectDialogueImage))
		}

		for (const asset of Object.keys(previewKeys)) {
			assets.push(await this.checkSharedImage(asset, previewKeys[asset], inspectDialoguePreviewImage))
		}

		return { ready: assets.every((asset) => asset.status === 'ready'), assets }
	}

	/** Проверяет один объект переданным декодером: для эталонов — тем же, что применяет worker. */
	private async checkSharedImage(
		asset: keyof DialogueSharedImageKeys,
		key: string | null,
		inspectImage: (bytes: Buffer) => Promise<{ width: number; height: number; mime: string }>,
	): Promise<DialogueSharedImageCheck> {
		if (!key?.trim()) return { asset, key, status: 'unconfigured' }

		let bytes: Buffer

		try {
			bytes = await this.storage.readFile(key)
		} catch {
			return { asset, key, status: 'unavailable' }
		}

		try {
			const { width, height, mime } = await inspectImage(bytes)
			return { asset, key, status: 'ready', width, height, mime }
		} catch {
			return { asset, key, status: 'invalid' }
		}
	}
}
