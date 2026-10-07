import sharp from 'sharp'
import {
	assertDialogueImageRatio,
	dialogueImageReference,
	inspectDialogueImage,
	neutralNpcReference,
} from './dialogueImageFiles'

describe('dialogue image files', () => {
	it.each(['png', 'jpeg', 'webp'] as const)('decodes %s and retains original reference bytes', async (format) => {
		const bytes = await sharp({ create: { width: 512, height: 256, channels: 3, background: 'red' } })
			.toFormat(format)
			.toBuffer()
		const metadata = await inspectDialogueImage(bytes)
		expect(metadata).toMatchObject({ width: 512, height: 256, mime: `image/${format}` })
		expect(await dialogueImageReference(bytes)).toBe(`data:${metadata.mime};base64,${bytes.toString('base64')}`)
	})
	it('extracts only the top-left neutral cell and enlarges it to the BFL minimum', async () => {
		const red = await sharp({ create: { width: 120, height: 120, channels: 3, background: 'red' } })
			.png()
			.toBuffer()
		const sprite = await sharp({ create: { width: 480, height: 360, channels: 3, background: 'blue' } })
			.composite([{ input: red, left: 0, top: 0 }])
			.png()
			.toBuffer()
		const reference = await neutralNpcReference(sprite)
		const cell = Buffer.from(reference.split(',')[1], 'base64')
		expect(await sharp(cell).metadata()).toMatchObject({ width: 256, height: 256 })
		const pixels = await sharp(cell).removeAlpha().raw().toBuffer()
		for (let offset = 0; offset < pixels.length; offset += 3)
			expect([...pixels.subarray(offset, offset + 3)]).toEqual([255, 0, 0])
	})
	it('rejects MIME mismatch, small files, corrupt pixels and excessive bytes', async () => {
		const bytes = await sharp({ create: { width: 512, height: 256, channels: 3, background: 'red' } })
			.png()
			.toBuffer()
		await expect(inspectDialogueImage(bytes, 'image/jpeg')).rejects.toThrow('MIME')
		await expect(inspectDialogueImage(bytes.subarray(0, bytes.length / 2))).rejects.toThrow()
		await expect(inspectDialogueImage(Buffer.alloc(33 * 1024 * 1024))).rejects.toThrow('size')
		const small = await sharp(bytes).resize(128, 128).toBuffer()
		await expect(inspectDialogueImage(small)).rejects.toThrow('small')
	})
	it('allows grid rounding but rejects another aspect ratio', () => {
		expect(() => assertDialogueImageRatio(1024, 768, 4 / 3)).not.toThrow()
		expect(() => assertDialogueImageRatio(1024, 512, 4 / 3)).toThrow('ratio')
	})
})
