import { LanguageCode } from 'prisma/generated/enums'

export type SentenceTranslationServiceModel = {
	id: number
	sentenceId: number
	targetLanguageCode: LanguageCode
	translation: string
	createdAt: Date
}
