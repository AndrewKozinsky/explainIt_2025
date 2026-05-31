import { Injectable } from '@nestjs/common'
import { Language } from 'utils/languages'
import { Prisma } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import { CloudRuS3Service } from '../infrastructure/cloudRuS3/cloudRuS3.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { UniversalPhraseOutModel } from '../models/universalPhrase/universalPhrase.out.model'

type UniversalPhraseWithRelations = Prisma.UniversalPhraseGetPayload<{
	include: {
		UniversalTranscription: true
		UniversalAudioPronunciation: true
	}
}>

@Injectable()
export class UniversalPhraseQueryRepository {
	constructor(
		private prisma: PrismaService,
		private cloudRuS3Service: CloudRuS3Service,
	) {}

	@CatchDbError()
	async getUniversalPhraseByTextAndLang(text: string, sourceLanguageCode: Language) {
		const dbPhrase = await this.prisma.universalPhrase.findFirst({
			where: { text, source_language_code: sourceLanguageCode },
			include: {
				UniversalTranscription: true,
				UniversalAudioPronunciation: true,
			},
		})

		if (!dbPhrase) {
			return null
		}

		return await this.mapDbUniversalPhraseToOutModel(dbPhrase)
	}

	@CatchDbError()
	async getUniversalPhraseById(id: number) {
		const dbPhrase = await this.prisma.universalPhrase.findUnique({
			where: { id },
			include: {
				UniversalTranscription: true,
				UniversalAudioPronunciation: true,
			},
		})

		if (!dbPhrase) {
			return null
		}

		return await this.mapDbUniversalPhraseToOutModel(dbPhrase)
	}

	async mapDbUniversalPhraseToOutModel(dbPhrase: UniversalPhraseWithRelations): Promise<UniversalPhraseOutModel> {
		const transcription = dbPhrase.UniversalTranscription
			? {
					id: dbPhrase.UniversalTranscription.id,
					universalPhraseId: dbPhrase.UniversalTranscription.universal_phrase_id,
					ipa: dbPhrase.UniversalTranscription.ipa,
					pinyin: dbPhrase.UniversalTranscription.pinyin,
				}
			: null

		const dbAudioPronunciation = dbPhrase.UniversalAudioPronunciation
		const audioPronunciation = dbAudioPronunciation
			? {
				id: dbAudioPronunciation.id,
				universalPhraseId: dbAudioPronunciation.universal_phrase_id,
				audioUrl: await this.cloudRuS3Service.getFileUrl(dbAudioPronunciation.s3_key),
			}
			: null

		return {
			id: dbPhrase.id,
			text: dbPhrase.text,
			sourceLanguageCode: dbPhrase.source_language_code,
			transcription,
			audioPronunciation,
		}
	}
}
