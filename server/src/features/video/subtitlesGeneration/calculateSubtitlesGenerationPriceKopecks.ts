export function calculateSubtitlesGenerationPriceKopecks(params: {
	durationSec: number
	pricePerSecondInKopecks: number
	asrMarkupMultiplier: number
}) {
	if (params.durationSec <= 0) return 0

	return Math.max(1, Math.ceil(params.durationSec * params.pricePerSecondInKopecks * params.asrMarkupMultiplier))
}
