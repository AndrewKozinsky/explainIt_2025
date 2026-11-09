import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Injectable, Logger } from '@nestjs/common'
import { WordSenseRepository } from 'repo/universalPhrase/wordSense.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { ImageGenerationAdapterService } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationAdapter.service'
import { ImageProcessingService } from 'infrastructure/imageProcessing/imageProcessing.service'
import {
	WordSenseServiceModel,
	WordSenseVisualAspect,
	WordSenseVisualKind,
} from 'models/universalPhraseTranslation/wordSense.service.model'
import {
	WORD_SENSE_IMAGE_STORED_QUALITY,
	WORD_SENSE_IMAGE_STORED_WIDTH,
	WORD_SENSE_STYLE_SAMPLE_FILES,
} from '../dictionaryArticleConfig'
import { buildWordSenseImageInput } from './buildWordSenseImageInput'

const STYLE_SAMPLES_DIRECTORY = 'src/features/universalPhraseTranslation/enrichment/styleSamples'

/** Рисует иллюстрацию значения и публикует её в R2. Картинка общая для всех форм слова и языков. */
@Injectable()
export class GenerateWordSenseImage {
	private readonly logger = new Logger(GenerateWordSenseImage.name)

	constructor(
		private readonly wordSenseRepository: WordSenseRepository,
		private readonly imageAdapter: ImageGenerationAdapterService,
		private readonly imageProcessing: ImageProcessingService,
		private readonly cloudflareS3: CloudflareS3Service,
	) {}

	async generate(wordSenseId: number): Promise<void> {
		if (!(await this.wordSenseRepository.claimImageGeneration(wordSenseId))) return

		try {
			const wordSense = await this.wordSenseRepository.findById(wordSenseId)
			if (!wordSense) return

			await this.generateAndPublish(wordSense)
		} catch (generationError) {
			this.logger.error(`Word sense image ${wordSenseId} failed`, generationError)
			await this.wordSenseRepository.markImageFailed(wordSenseId)
		}
	}

	private async generateAndPublish(wordSense: WordSenseServiceModel): Promise<void> {
		const kind = wordSense.visualKind as WordSenseVisualKind
		const styleSample = await readFile(
			join(process.cwd(), STYLE_SAMPLES_DIRECTORY, WORD_SENSE_STYLE_SAMPLE_FILES[kind]),
		)

		const generationResult = await this.imageAdapter.generate(
			buildWordSenseImageInput({
				kind,
				aspect: wordSense.visualAspect as WordSenseVisualAspect,
				visualPrompt: wordSense.visualPrompt!,
				styleSample,
			}),
		)
		if (generationResult.status !== 'ready') throw new Error('Expected a completed word sense image')

		const compressedImage = await this.imageProcessing.transform(generationResult.images[0].bytes, {
			resize: { width: WORD_SENSE_IMAGE_STORED_WIDTH, withoutEnlargement: true },
			format: 'webp',
			quality: WORD_SENSE_IMAGE_STORED_QUALITY,
		})

		const imageS3Key = `dictionary-images/word-senses/${wordSense.id}.webp`
		await this.cloudflareS3.uploadFile(imageS3Key, compressedImage.data, 'image/webp')
		await this.wordSenseRepository.markImageReady(wordSense.id, imageS3Key)
	}
}
