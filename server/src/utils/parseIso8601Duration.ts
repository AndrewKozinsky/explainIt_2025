/**
 * Parse an ISO 8601 duration string (e.g. "PT1H30M15S", "PT2M30S", "PT45S")
 * and return the total duration in seconds.
 *
 * Returns null if the input is null, empty, or not a valid duration.
 */
export function parseIso8601Duration(duration: null | string): null | number {
	if (!duration) return null

	const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/)
	if (!match) return null

	const hours = parseInt(match[1] ?? '0', 10)
	const minutes = parseInt(match[2] ?? '0', 10)
	const seconds = parseInt(match[3] ?? '0', 10)

	return hours * 3600 + minutes * 60 + seconds
}
