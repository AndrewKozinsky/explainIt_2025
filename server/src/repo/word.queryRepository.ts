import { Injectable } from '@nestjs/common'
import { Language } from 'utils/languages'
import { Prisma } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { WordOutModel } from '../models/word/word.out.model'

type WordWithRelations = Prisma.WordGetPayload<{
	include: { Transcription: true /*AudioPronunciation: true*/ }
}>

@Injectable()
export class WordQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getWordByTextAndLang(word: string, lang: Language) {
		const dbWord = await this.prisma.word.findFirst({
			where: { word, language_code: lang },
			include: {
				Transcription: true,
				// AudioPronunciation: true,
			},
		})

		if (!dbWord) {
			return null
		}

		return this.mapDbWordToOutWord(dbWord)
	}

	@CatchDbError()
	async getWordById(id: number) {
		const dbWord = await this.prisma.word.findUnique({
			where: { id },
			include: {
				Transcription: true,
				// AudioPronunciation: true,
			},
		})

		if (!dbWord) {
			return null
		}

		return this.mapDbWordToOutWord(dbWord)
	}

	mapDbWordToOutWord(dbWord: WordWithRelations): WordOutModel {
		return {
			id: dbWord.id,
			word: dbWord.word,
			languageCode: dbWord.language_code,
			transcription: dbWord.Transcription
				? {
						id: dbWord.Transcription.id,
						wordId: dbWord.Transcription.word_id,
						ipa: dbWord.Transcription.ipa,
						pinyin: dbWord.Transcription.pinyin,
					}
				: null,
			/*audioPronunciations: dbWord.AudioPronunciation.map((ap) => ({
				id: ap.id,
				wordId: ap.word_id,
				voiceId: ap.voice_id,
				audioUrl: ap.audio_url,
				duration: ap.duration,
			})),*/
		}
	}
}
