/** Разбор заголовков кадров MPEG Layer III без декодирования звука. */

const MPEG1_BITRATES = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320]
const MPEG2_BITRATES = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]

export type Mp3FrameHeader = {
	frameSize: number
	sampleRate: number
	samplesPerFrame: number
}

/** Смещение первого байта после ID3-заголовка или null, если заголовок повреждён. */
export function getMp3AudioStartOffset(bytes: Buffer): null | number {
	if (bytes.subarray(0, 3).toString('ascii') !== 'ID3') return 0
	if (bytes.length < 10 || [6, 7, 8, 9].some((index) => bytes[index] > 127)) return null

	return 10 + ((bytes[6] << 21) | (bytes[7] << 14) | (bytes[8] << 7) | bytes[9])
}

/** Заголовок кадра Layer III, начинающегося с offset, или null, если там нет корректного заголовка. */
export function parseMp3FrameHeader(bytes: Buffer, offset: number): null | Mp3FrameHeader {
	if (offset < 0 || offset + 3 >= bytes.length) return null

	const version = (bytes[offset + 1] >> 3) & 3
	const layer = (bytes[offset + 1] >> 1) & 3
	const rateIndex = (bytes[offset + 2] >> 2) & 3
	const bitrateIndex = bytes[offset + 2] >> 4

	if (
		bytes[offset] !== 255 ||
		(bytes[offset + 1] & 224) !== 224 ||
		version === 1 ||
		layer !== 1 ||
		rateIndex === 3 ||
		bitrateIndex === 0 ||
		bitrateIndex === 15
	) {
		return null
	}

	const isMpeg1 = version === 3
	const sampleRate = [44100, 48000, 32000][rateIndex] / (isMpeg1 ? 1 : version === 2 ? 2 : 4)
	const bitrate = (isMpeg1 ? MPEG1_BITRATES : MPEG2_BITRATES)[bitrateIndex]
	const padding = (bytes[offset + 2] >> 1) & 1
	const frameSize = Math.floor(((isMpeg1 ? 144000 : 72000) * bitrate) / sampleRate) + padding

	return { frameSize, sampleRate, samplesPerFrame: isMpeg1 ? 1152 : 576 }
}

/**
 * Длительность MP3 в секундах: сумма длительностей всех целых кадров.
 * Работает и для постоянного, и для переменного битрейта; мусор между кадрами пропускается.
 */
export function getMp3DurationSeconds(bytes: Buffer): number {
	const audioStart = getMp3AudioStartOffset(bytes)
	if (audioStart === null) return 0

	let durationSeconds = 0
	let offset = audioStart

	while (offset < bytes.length - 3) {
		const header = parseMp3FrameHeader(bytes, offset)

		if (!header || header.frameSize < 24 || offset + header.frameSize > bytes.length) {
			offset += 1
			continue
		}

		durationSeconds += header.samplesPerFrame / header.sampleRate
		offset += header.frameSize
	}

	return durationSeconds
}
