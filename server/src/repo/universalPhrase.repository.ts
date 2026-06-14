import { Injectable } from '@nestjs/common'
import { normalizeSentence } from 'utils/stringUtils'
import { LanguageCode, Prisma } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

type DbUniversalPhraseWithRelations = Prisma.UniversalPhraseGetPayload<{
	include: {
		UniversalTranscription: true
		UniversalAudioPronunciation: true
	}
}>

export type UniversalPhraseServiceModel = {
	id: number
	sentenceText: string
	sourceLanguageCode: string
	transcription: {
		id: number
		universalPhraseId: number
		ipa: string | null
		pinyin: string | null
	} | null
	audioPronunciation: {
		id: number
		universalPhraseId: number
		audioUrl: string
	} | null
}

@Injectable()
export class UniversalPhraseRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createUniversalPhrase(dto: { text: string; sourceLanguageCode: LanguageCode }) {
		return await this.prisma.universalPhrase.create({
			data: {
				text: normalizeSentence(dto.text),
				source_language_code: dto.sourceLanguageCode,
			},
		})
	}

	@CatchDbError()
	async findOrCreate(input: { sentenceText: string; sourceLanguage: string }): Promise<UniversalPhraseServiceModel> {
		const normalizedText = normalizeSentence(input.sentenceText)

		// Атомарный upsert: один SQL-запрос INSERT ... ON CONFLICT ... DO NOTHING RETURNING *
		// Нет окна для гонки между проверкой и вставкой, в отличие от findUnique + create.
		const record = await this.prisma.universalPhrase.upsert({
			where: {
				source_language_code_text: {
					text: normalizedText,
					source_language_code: input.sourceLanguage as any,
				},
			},
			create: {
				text: normalizedText,
				source_language_code: input.sourceLanguage as any,
			},
			update: {},
			include: {
				UniversalTranscription: true,
				UniversalAudioPronunciation: true,
			},
		})

		return this.mapDbToServiceModel(record as DbUniversalPhraseWithRelations)
	}

	@CatchDbError()
	async findByIdWithRelations(id: number): Promise<UniversalPhraseServiceModel | null> {
		const record = await this.prisma.universalPhrase.findUnique({
			where: { id },
			include: {
				UniversalTranscription: true,
				UniversalAudioPronunciation: true,
			},
		})
		if (!record) return null

		return this.mapDbToServiceModel(record as DbUniversalPhraseWithRelations)
	}

	@CatchDbError()
	async findBySentenceTextAndLang(
		sentenceText: string,
		sourceLanguage: string,
	): Promise<UniversalPhraseServiceModel | null> {
		const normalizedText = normalizeSentence(sentenceText)

		const record = await this.prisma.universalPhrase.findUnique({
			where: {
				source_language_code_text: {
					text: normalizedText,
					source_language_code: sourceLanguage as any,
				},
			},
			include: {
				UniversalTranscription: true,
				UniversalAudioPronunciation: true,
			},
		})

		if (!record) return null
		return this.mapDbToServiceModel(record as DbUniversalPhraseWithRelations)
	}

	private mapDbToServiceModel(db: DbUniversalPhraseWithRelations): UniversalPhraseServiceModel {
		return {
			id: db.id,
			sentenceText: db.text,
			sourceLanguageCode: db.source_language_code,
			transcription: db.UniversalTranscription
				? {
						id: db.UniversalTranscription.id,
						universalPhraseId: db.UniversalTranscription.universal_phrase_id,
						ipa: db.UniversalTranscription.ipa,
						pinyin: db.UniversalTranscription.pinyin,
					}
				: null,
			audioPronunciation: db.UniversalAudioPronunciation
				? {
						id: db.UniversalAudioPronunciation.id,
						universalPhraseId: db.UniversalAudioPronunciation.universal_phrase_id,
						audioUrl: '', // URL генерируется через S3 сервис — здесь заглушка
					}
				: null,
		}
	}
}
