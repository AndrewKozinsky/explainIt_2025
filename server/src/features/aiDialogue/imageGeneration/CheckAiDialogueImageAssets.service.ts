import { Injectable } from '@nestjs/common'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { inspectDialogueImage } from './dialogueImageFiles'

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
	 * Читает и декодирует эталоны стиля без записи в R2, БД и вызова генератора.
	 * Ошибки отдельных объектов не прерывают остальные проверки и не раскрывают ответы SDK/секреты.
	 * @param keys Именованные эталоны текущего каталога для проверяемого MODE.
	 * @returns Готовность всех эталонов и безопасный отчёт с фактическими размерами/форматом.
	 */
	async checkSharedImageAssets(
		keys: DialogueSharedImageKeys,
	): Promise<{ ready: boolean; assets: DialogueSharedImageCheck[] }> {
		const assets: DialogueSharedImageCheck[] = []

		for (const asset of Object.keys(keys)) {
			assets.push(await this.checkSharedImage(asset, keys[asset]))
		}

		return { ready: assets.every((asset) => asset.status === 'ready'), assets }
	}

	/** Проверяет один объект тем же декодером и лимитами, которые worker применяет к референсам. */
	private async checkSharedImage(
		asset: keyof DialogueSharedImageKeys,
		key: string | null,
	): Promise<DialogueSharedImageCheck> {
		if (!key?.trim()) return { asset, key, status: 'unconfigured' }

		let bytes: Buffer

		try {
			bytes = await this.storage.readFile(key)
		} catch {
			return { asset, key, status: 'unavailable' }
		}

		try {
			const { width, height, mime } = await inspectDialogueImage(bytes)
			return { asset, key, status: 'ready', width, height, mime }
		} catch {
			return { asset, key, status: 'invalid' }
		}
	}
}
