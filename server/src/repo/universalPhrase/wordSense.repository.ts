import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { WordSenseServiceModel, WordSenseVisual } from 'models/universalPhraseTranslation/wordSense.service.model'
import { LanguageCode, WordSense } from 'prisma/generated/client'

@Injectable()
export class WordSenseRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async findByLemmas(sourceLanguageCode: LanguageCode, lemmas: string[]): Promise<WordSenseServiceModel[]> {
		const wordSenses = await this.prisma.wordSense.findMany({
			where: { source_language_code: sourceLanguageCode, lemma: { in: lemmas } },
			orderBy: { id: 'asc' },
		})

		return wordSenses.map((wordSense) => this.mapDbToService(wordSense))
	}

	@CatchDbError()
	async findById(id: number): Promise<WordSenseServiceModel | null> {
		const wordSense = await this.prisma.wordSense.findUnique({ where: { id } })

		return wordSense ? this.mapDbToService(wordSense) : null
	}

	/** Возвращает значение леммы, создавая его при первой встрече. Уже известное значение не меняется. */
	@CatchDbError()
	async findOrCreate(input: {
		sourceLanguageCode: LanguageCode
		lemma: string
		gloss: string
		visual: WordSenseVisual | null
	}): Promise<WordSenseServiceModel> {
		const wordSense = await this.prisma.wordSense.upsert({
			where: {
				source_language_code_lemma_gloss: {
					source_language_code: input.sourceLanguageCode,
					lemma: input.lemma,
					gloss: input.gloss,
				},
			},
			update: {},
			create: {
				source_language_code: input.sourceLanguageCode,
				lemma: input.lemma,
				gloss: input.gloss,
				visual_kind: input.visual?.kind ?? null,
				visual_aspect: input.visual?.aspect ?? null,
				visual_prompt: input.visual?.prompt ?? null,
				image_status: input.visual ? 'pending' : 'none',
			},
		})

		return this.mapDbToService(wordSense)
	}

	/** Атомарно занимает генерацию, чтобы одно значение не оплачивалось дважды. */
	@CatchDbError()
	async claimImageGeneration(id: number): Promise<boolean> {
		const claimed = await this.prisma.wordSense.updateMany({
			where: { id, image_status: 'pending' },
			data: { image_status: 'generating' },
		})

		return claimed.count === 1
	}

	@CatchDbError()
	async markImageReady(id: number, imageS3Key: string): Promise<void> {
		await this.prisma.wordSense.update({
			where: { id },
			data: { image_s3_key: imageS3Key, image_status: 'ready' },
		})
	}

	@CatchDbError()
	async markImageFailed(id: number): Promise<void> {
		await this.prisma.wordSense.update({ where: { id }, data: { image_status: 'failed' } })
	}

	private mapDbToService(wordSense: WordSense): WordSenseServiceModel {
		return {
			id: wordSense.id,
			sourceLanguageCode: wordSense.source_language_code,
			lemma: wordSense.lemma,
			gloss: wordSense.gloss,
			visualKind: wordSense.visual_kind,
			visualAspect: wordSense.visual_aspect,
			visualPrompt: wordSense.visual_prompt,
			imageS3Key: wordSense.image_s3_key,
			imageStatus: wordSense.image_status,
		}
	}
}
