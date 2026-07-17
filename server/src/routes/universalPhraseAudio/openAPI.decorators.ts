import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { UniversalAudioPronunciationOutModel } from 'models/audioPronunciation/audioPronunciation.out.model'
import { CreateUniversalPhraseAudioInput } from './inputs/createAudioPronunciation.input'

export function ApiGetAudio() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get audio pronunciation',
			description: 'Get existing audio pronunciation for a phrase (read-only, does not create).',
		}),
		ApiResponse({
			status: 200,
			description: 'OK',
			type: UniversalAudioPronunciationOutModel,
			nullable: true,
		}),
	)
}

export function ApiGetOrCreateAudio() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get or create audio pronunciation',
			description: 'Get or create audio pronunciation for a word using Google TTS and store it on S3.',
		}),
		ApiBody({ type: CreateUniversalPhraseAudioInput }),
		ApiResponse({ status: 201, description: 'Created', type: UniversalAudioPronunciationOutModel }),
	)
}
