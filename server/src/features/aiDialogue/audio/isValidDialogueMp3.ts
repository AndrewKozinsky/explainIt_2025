/**
 * Ограничивает размер и требует хотя бы один целый кадр MPEG Layer III: одного ID3-заголовка недостаточно.
 * Это структурная проверка ответа TTS, а не декодирование всего файла.
 */
export function isValidDialogueMp3(bytes: Buffer): boolean {
	if (bytes.length < 4 || bytes.length > 32 * 1024 * 1024) return false

	let offset = 0

	if (bytes.subarray(0, 3).toString('ascii') === 'ID3') {
		if (bytes.length < 10 || [6, 7, 8, 9].some((i) => bytes[i] > 127)) return false
		offset = 10 + ((bytes[6] << 21) | (bytes[7] << 14) | (bytes[8] << 7) | bytes[9])
	}
	const bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320]
	const lowBitrates = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]

	for (let i = offset; i < Math.min(bytes.length - 3, offset + 4096); i += 1) {
		const version = (bytes[i + 1] >> 3) & 3
		const layer = (bytes[i + 1] >> 1) & 3
		const rateIndex = (bytes[i + 2] >> 2) & 3
		const bitrateIndex = bytes[i + 2] >> 4

		if (
			bytes[i] !== 255 ||
			(bytes[i + 1] & 224) !== 224 ||
			version === 1 ||
			layer !== 1 ||
			rateIndex === 3 ||
			bitrateIndex === 0 ||
			bitrateIndex === 15
		) {
			continue
		}

		const sampleRate = [44100, 48000, 32000][rateIndex] / (version === 3 ? 1 : version === 2 ? 2 : 4)
		const bitrate = (version === 3 ? bitrates : lowBitrates)[bitrateIndex]
		const frameSize =
			Math.floor(((version === 3 ? 144000 : 72000) * bitrate) / sampleRate) + ((bytes[i + 2] >> 1) & 1)
		if (frameSize >= 24 && i + frameSize <= bytes.length) return true
	}
	return false
}
