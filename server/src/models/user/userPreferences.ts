import type { Prisma } from 'prisma/generated/client'

export const GENERATE_SCENE_IMAGE = 'ai-dialogue-generate-scene-image'

export type UserPreferences = {
	[GENERATE_SCENE_IMAGE]?: boolean
}

export function readUserPreferences(value: Prisma.JsonValue): UserPreferences {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

	const generateSceneImage = value[GENERATE_SCENE_IMAGE]

	return typeof generateSceneImage === 'boolean' ? { [GENERATE_SCENE_IMAGE]: generateSceneImage } : {}
}
