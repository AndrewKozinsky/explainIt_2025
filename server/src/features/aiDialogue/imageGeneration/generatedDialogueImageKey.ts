import { getR2EnvironmentPrefix, isR2EnvironmentSegment } from 'infrastructure/cloudflareS3/r2EnvironmentPrefix'

export const GENERATED_DIALOGUE_IMAGES_PATH = 'ai-dialogue-images/generated'

/** Разделяет исходники независимых БД в одном бакете по региону и окружению HTTP/worker. */
export function getGeneratedDialogueImagesPrefix(config: { region?: string; mode?: string }): string {
	if (!config.region || !/^[a-z]+$/.test(config.region))
		throw new Error('Invalid dialogue image storage namespace')
	return getR2EnvironmentPrefix(`${GENERATED_DIALOGUE_IMAGES_PATH}/${config.region}`, config.mode)
}

/** Возвращает ID задания только для уникальных исходников приложения; общие ресурсы и чужие ключи отклоняет. */
export function getGeneratedDialogueImageJobId(key: string): number | null {
	const match =
		/^ai-dialogue-images\/generated\/(?:[a-z]+\/([^/]+)\/)?job-([1-9]\d*)\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(png|jpg|webp)$/.exec(
			key,
		)
	if (!match || (match[1] !== undefined && !isR2EnvironmentSegment(match[1]))) return null

	const id = Number(match[2])

	return Number.isSafeInteger(id) ? id : null
}
