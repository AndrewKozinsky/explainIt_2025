import { Injectable } from '@nestjs/common'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import {
	AI_DIALOGUE_STYLE_AVATAR_REFERENCE_S3_KEY,
	AI_DIALOGUE_STYLE_SCENE_REFERENCE_S3_KEY,
	AI_DIALOGUE_USER_AVATAR_S3_KEY,
} from '../aiDialogueVisualConfig'
import { inspectDialogueImage } from './dialogueImageFiles'

export type DialogueSharedImageKeys = {
	userAvatar: string
	avatarStyle: string | null
	sceneStyle: string | null
}

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
	 * Читает и декодирует общий портрет и эталоны без записи в R2, БД и вызова генератора.
	 * Ошибки отдельных объектов не прерывают остальные проверки и не раскрывают ответы SDK/секреты.
	 * @param keys Актуальные ключи из visual config; подмена предназначена для изолированных проверок.
	 * @returns Готовность всех трёх ресурсов и безопасный отчёт с фактическими размерами/форматом.
	 */
	async checkSharedImageAssets(
		keys: DialogueSharedImageKeys = {
			userAvatar: AI_DIALOGUE_USER_AVATAR_S3_KEY,
			avatarStyle: AI_DIALOGUE_STYLE_AVATAR_REFERENCE_S3_KEY,
			sceneStyle: AI_DIALOGUE_STYLE_SCENE_REFERENCE_S3_KEY,
		},
	): Promise<{ ready: boolean; assets: DialogueSharedImageCheck[] }> {
		const assets: DialogueSharedImageCheck[] = []
		for (const asset of ['userAvatar', 'avatarStyle', 'sceneStyle'] as const) {
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
