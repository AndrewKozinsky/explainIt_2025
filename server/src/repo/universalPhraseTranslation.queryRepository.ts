import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { TranscriptionOutModel } from 'models/transcription/transcription.out.model'
import { UniversalPhraseTranslationOutModel } from 'models/universalPhraseTranslation/universalPhraseTranslation.out.model'
import { UniversalPhraseTranslationData } from 'models/universalPhraseTranslation/universalPhraseTranslation.service.model'
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

@Injectable()
export class UniversalPhraseTranslationQueryRepository {
	constructor(private prisma: PrismaService) {}

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

	private mapDbToOut(db: TranslationWithPhraseAndTranscription): UniversalPhraseTranslationOutModel {
		let translation: null | UniversalPhraseTranslationData = null

		if (db.translation) {
			translation = JSON.parse(db.translation) as UniversalPhraseTranslationData
		}

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
			translation,
			status: db.status,
			errorMessage: db.error_message,
			nonExistentWord: db.non_existent_word,
			createdAt: db.created_at.toISOString(),
			transcription,
		}
	}
}
