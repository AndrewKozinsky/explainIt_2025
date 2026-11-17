import { getR2EnvironmentPrefix } from 'infrastructure/cloudflareS3/r2EnvironmentPrefix'

export function getGeneratedDialogueImagesPrefix(mode: string | undefined): string {
	return getR2EnvironmentPrefix('ai-dialogue-images-generated', mode)
}

/** Проверяет префикс окружения и формат полного ключа. */
export function getGeneratedDialogueImageJobId(key: string, prefix: string): number | null {
	if (!key.startsWith(prefix)) return null

	const match =
		/^job-([1-9]\d*)\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(png|jpg|webp)$/.exec(
			key.slice(prefix.length),
		)

	if (!match) return null

	const id = Number(match[1])

	return Number.isSafeInteger(id) ? id : null
}
