import sharp from 'sharp'

const MAX_IMAGE_BYTES = 32 * 1024 * 1024
const MAX_IMAGE_PIXELS = 16 * 1024 * 1024
const formats = {
	png: { mime: 'image/png', extension: 'png' },
	jpeg: { mime: 'image/jpeg', extension: 'jpg' },
	webp: { mime: 'image/webp', extension: 'webp' },
} as const

/**
 * Проверяет файл PNG/JPEG/WebP, декодируя все пиксели, а не только заголовок; байты не изменяет.
 * Ограничивает размер, число пикселей и минимальные габариты; отклоняет анимацию и поворот EXIF.
 * @param bytes Исходный файл изображения.
 * @param declaredMime Необязательный MIME из HTTP-ответа, который должен совпасть с фактическим форматом.
 * @returns Фактические размеры, MIME и расширение для ключа R2.
 * @throws При нарушении ограничений, несовпадении MIME или ошибке декодирования.
 */
export async function inspectDialogueImage(bytes: Buffer, declaredMime?: string | null) {
	if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) throw new Error('Invalid dialogue image file size')
	const image = sharp(bytes, { limitInputPixels: MAX_IMAGE_PIXELS, failOn: 'warning' })
	const metadata = await image.metadata()
	if (!metadata.format || !(metadata.format in formats)) throw new Error('Unsupported dialogue image format')
	const format = formats[metadata.format as keyof typeof formats]
	if (declaredMime && declaredMime.split(';')[0].trim().toLowerCase() !== format.mime)
		throw new Error('Dialogue image MIME mismatch')
	if (!metadata.width || !metadata.height || metadata.width < 256 || metadata.height < 256)
		throw new Error('Dialogue image is too small')
	if ((metadata.pages ?? 1) !== 1 || (metadata.orientation ?? 1) !== 1)
		throw new Error('Animated or rotated dialogue image is unsupported')
	await image.raw().toBuffer()
	return { width: metadata.width, height: metadata.height, mime: format.mime, extension: format.extension }
}

/**
 * Проверяет соотношение сторон с относительным допуском 3% на округление сетки генератора.
 * @param width Ширина проверенного изображения в пикселях.
 * @param height Высота проверенного изображения в пикселях.
 * @param ratio Ожидаемое отношение ширины к высоте (например, 4 / 3 или 2).
 * @throws При выходе соотношения сторон за допустимый диапазон.
 */
export function assertDialogueImageRatio(width: number, height: number, ratio: number): void {
	// References may have a rounded grid; generated results additionally require the exact saved pixel size.
	if (Math.abs(width / height - ratio) / ratio > 0.03) throw new Error('Dialogue image aspect ratio mismatch')
}

/**
 * Извлекает верхнюю левую нейтральную ячейку спрайта 4×3 и кодирует её в PNG-референс.
 * Маленькую ячейку увеличивает до 256×256 только в памяти; исходный спрайт не изменяет.
 * Вызывающий код должен заранее проверить layout_version emotion-grid-4x3-v1.
 * @param bytes Исходные байты листа эмоций NPC.
 * @returns Data URI нейтрального портрета для поставщика изображений.
 * @throws При неверном файле/соотношении сторон или ошибке обработки ячейки.
 */
export async function neutralNpcReference(bytes: Buffer): Promise<string> {
	const metadata = await inspectDialogueImage(bytes)
	assertDialogueImageRatio(metadata.width, metadata.height, 4 / 3)
	const cellSize = Math.min(Math.floor(metadata.width / 4), Math.floor(metadata.height / 3))
	const image = await sharp(bytes)
		.extract({ left: 0, top: 0, width: cellSize, height: cellSize })
		.resize({ width: Math.max(256, cellSize), height: Math.max(256, cellSize) })
		.png()
		.toBuffer()

	return `data:image/png;base64,${image.toString('base64')}`
}

/**
 * Проверяет изображение и кодирует его исходные байты в data URI без уменьшения или перекодирования.
 * @param bytes Общий портрет пользователя или эталон стиля из R2.
 * @returns Data URI с MIME, определённым по содержимому файла.
 * @throws При неверном или неподдерживаемом изображении.
 */
export async function dialogueImageReference(bytes: Buffer): Promise<string> {
	const metadata = await inspectDialogueImage(bytes)
	return `data:${metadata.mime};base64,${bytes.toString('base64')}`
}
