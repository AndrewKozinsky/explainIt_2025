import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Language } from 'utils/languages'
import { UniversalAudioPronunciationOutModel } from 'models/audioPronunciation/audioPronunciation.out.model'
import { TranscriptionOutModel } from '../transcription/transcription.out.model'

@ObjectType()
export class UniversalPhraseOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	text: string

	@Field(() => String)
	sourceLanguageCode: Language

	@Field(() => TranscriptionOutModel, { nullable: true })
	transcription: TranscriptionOutModel | null

	@Field(() => UniversalAudioPronunciationOutModel, { nullable: true })
	audioPronunciation: UniversalAudioPronunciationOutModel | null
}
