import { getMp3AudioStartOffset, parseMp3FrameHeader } from './mp3Frames'

/**
 * Ограничивает размер и требует хотя бы один целый кадр MPEG Layer III: одного ID3-заголовка недостаточно.
 * Это структурная проверка ответа TTS, а не декодирование всего файла.
 */
export function isValidDialogueMp3(bytes: Buffer): boolean {
	if (bytes.length < 4 || bytes.length > 32 * 1024 * 1024) return false

	const audioStart = getMp3AudioStartOffset(bytes)
	if (audioStart === null) return false

	for (let offset = audioStart; offset < Math.min(bytes.length - 3, audioStart + 4096); offset += 1) {
		const header = parseMp3FrameHeader(bytes, offset)

		if (header && header.frameSize >= 24 && offset + header.frameSize <= bytes.length) {
			return true
		}
	}
	return false
}
