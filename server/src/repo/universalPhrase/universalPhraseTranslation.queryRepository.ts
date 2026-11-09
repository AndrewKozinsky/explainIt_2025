import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import { getWordForms } from 'features/universalPhraseTranslation/wordForms/getWordForms'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { TranscriptionOutModel } from 'models/transcription/transcription.out.model'
import { UniversalPhraseTranslationOutModel } from 'models/universalPhraseTranslation/universalPhraseTranslation.out.model'
import { TranslationBlock } from 'models/universalPhraseTranslation/universalPhraseTranslation.service.model'
import { Prisma } from 'prisma/generated/client'

type TranslationWithPhraseAndTranscription = Prisma.UniversalPhraseTranslationGetPayload<{
	include: {
		universal_phrase: {
			include: {
				UniversalTranscription: true
			}
		}
	}
}>

type SenseImage = { imageUrl: string; imageAspect: null | string }

@Injectable()
export class UniversalPhraseTranslationQueryRepository {
	constructor(
		private prisma: PrismaService,
		private cloudflareS3: CloudflareS3Service,
	) {}

	@CatchDbError()
	async getById(id: number): Promise<null | UniversalPhraseTranslationOutModel> {
		const phraseTranscription = await this.prisma.universalPhraseTranslation.findUnique({
			where: { id },
			include: {
				universal_phrase: {
					include: {
						UniversalTranscription: true,
					},
				},
			},
		})
		if (!phraseTranscription) return null

		return this.mapDbToOut(phraseTranscription as TranslationWithPhraseAndTranscription)
	}

	private async mapDbToOut(db: TranslationWithPhraseAndTranscription): Promise<UniversalPhraseTranslationOutModel> {
		const articleBlocks = parseBlocks(db.translation)
		const senseImages = await this.loadSenseImages(articleBlocks ?? [])

		const transcription: TranscriptionOutModel | null = db.universal_phrase?.UniversalTranscription
			? {
					id: db.universal_phrase.UniversalTranscription.id,
					universalPhraseId: db.universal_phrase.UniversalTranscription.universal_phrase_id,
					ipa: db.universal_phrase.UniversalTranscription.ipa,
					pinyin: db.universal_phrase.UniversalTranscription.pinyin,
				}
			: null

		return {
			id: db.id,
			universalPhraseId: db.universal_phrase_id,
			targetLanguageCode: db.target_language_code,
			translation: articleBlocks ? attachSenseImages(articleBlocks, senseImages) : null,
			deepSections: parseBlocks(db.deep_sections),
			wordForms: getWordForms(db.universal_phrase.source_language_code, parseLemmas(db.lemmas)),
			status: db.status,
			errorCode: db.error_code,
			nonExistentWord: db.non_existent_word,
			createdAt: db.created_at.toISOString(),
			transcription,
		}
	}

	private async loadSenseImages(articleBlocks: TranslationBlock[]): Promise<Map<number, SenseImage>> {
		const wordSenseIds = collectWordSenseIds(articleBlocks)
		if (wordSenseIds.length === 0) return new Map()

		const illustratedSenses = await this.prisma.wordSense.findMany({
			where: { id: { in: wordSenseIds }, image_status: 'ready' },
		})

		const senseImageEntries = await Promise.all(
			illustratedSenses.map(async (illustratedSense): Promise<[number, SenseImage]> => {
				const imageUrl = await this.cloudflareS3.getFileUrl(illustratedSense.image_s3_key!)
				return [illustratedSense.id, { imageUrl, imageAspect: illustratedSense.visual_aspect }]
			}),
		)

		return new Map(senseImageEntries)
	}
}

function parseBlocks(serializedBlocks: null | string): null | TranslationBlock[] {
	return serializedBlocks ? (JSON.parse(serializedBlocks) as TranslationBlock[]) : null
}

function parseLemmas(serializedLemmas: null | string): string[] {
	return serializedLemmas ? (JSON.parse(serializedLemmas) as string[]) : []
}

function collectWordSenseIds(blocks: TranslationBlock[]): number[] {
	return blocks.flatMap((block) => {
		if (block.type !== 'sense' && block.type !== 'block') return []

		const nestedIds = collectWordSenseIds(block.children)

		return block.type === 'sense' && block.wordSenseId !== null ? [block.wordSenseId, ...nestedIds] : nestedIds
	})
}

function attachSenseImages(blocks: TranslationBlock[], senseImages: Map<number, SenseImage>): object[] {
	return blocks.map((block) => {
		if (block.type !== 'sense' && block.type !== 'block') return block

		const children = attachSenseImages(block.children, senseImages)
		if (block.type === 'block') return { ...block, children }

		const senseImage = block.wordSenseId === null ? undefined : senseImages.get(block.wordSenseId)

		return {
			type: block.type,
			header: block.header,
			children,
			imageUrl: senseImage?.imageUrl ?? null,
			imageAspect: senseImage?.imageAspect ?? null,
		}
	})
}
