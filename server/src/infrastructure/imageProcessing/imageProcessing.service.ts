import { Injectable } from '@nestjs/common'
import sharp, { type Metadata, type ResizeOptions } from 'sharp'

export type ImageProcessingOptions = {
	limitInputPixels?: number
	autoOrient?: boolean
	resize?: ResizeOptions
	format?: 'jpeg' | 'png' | 'webp'
	quality?: number
	timeoutSeconds?: number
}

/** General image operations; callers choose validation rules, dimensions and output format. */
@Injectable()
export class ImageProcessingService {
	inspect(input: Buffer, limitInputPixels?: number): Promise<Metadata> {
		return sharp(input, { limitInputPixels, failOn: 'error' }).metadata()
	}

	async transform(input: Buffer, options: ImageProcessingOptions = {}) {
		let image = sharp(input, { limitInputPixels: options.limitInputPixels, failOn: 'error' })
		if (options.autoOrient) image = image.autoOrient()
		if (options.resize) image = image.resize(options.resize)
		if (options.format) image = image.toFormat(options.format, { quality: options.quality })
		if (options.timeoutSeconds) image = image.timeout({ seconds: options.timeoutSeconds })

		// Sharp strips metadata by default; no user EXIF/GPS data is copied to the output.
		return image.toBuffer({ resolveWithObject: true })
	}
}
