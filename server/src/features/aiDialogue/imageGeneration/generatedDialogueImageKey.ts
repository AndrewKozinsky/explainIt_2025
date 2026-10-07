export const GENERATED_DIALOGUE_IMAGES_PREFIX = 'ai-dialogue-images/generated/'

/** Разделяет исходники независимых БД в одном бакете по региону и окружению HTTP/worker. */
export function getGeneratedDialogueImagesPrefix(config: { region?: string; mode?: string }): string {
	if (!config.region || !config.mode || !/^[a-z]+$/.test(config.region) || !/^[a-z]+$/.test(config.mode))
		throw new Error('Invalid dialogue image storage namespace')
	return `${GENERATED_DIALOGUE_IMAGES_PREFIX}${config.region}/${config.mode}/`
}

/** Возвращает ID задания только для уникальных исходников приложения; общие ресурсы и чужие ключи отклоняет. */
export function getGeneratedDialogueImageJobId(key: string): number | null {
	const match =
		/^ai-dialogue-images\/generated\/(?:[a-z]+\/[a-z]+\/)?job-([1-9]\d*)\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(png|jpg|webp)$/.exec(
			key,
		)
	const id = match ? Number(match[1]) : NaN

	return Number.isSafeInteger(id) ? id : null
}
