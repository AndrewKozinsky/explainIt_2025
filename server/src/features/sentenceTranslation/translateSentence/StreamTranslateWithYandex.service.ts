import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { YandexTranslateUsageBalanceChargeCommand } from 'features/payment/YandexTranslateUsageBalanceCharge.command'
import { YandexTranslateService } from 'infrastructure/yandexTranslate/yandexTranslate.service'
import { TranslateSentenceStreamEvent } from './TranslateSentence.command'

@Injectable()
export class StreamTranslateWithYandex {
	constructor(
		private yandexTranslateService: YandexTranslateService,
		private sentenceTranslationRepository: SentenceTranslationRepository,
		private commandBus: CommandBus,
	) {}

	async *streamTranslate(input: {
		userId: number
		sentenceId: number
		text: string
		sourceLanguageCode: string
		targetLanguageCode: string
	}): AsyncGenerator<TranslateSentenceStreamEvent> {
		const result = await this.yandexTranslateService.translateText({
			text: input.text,
			targetLanguageCode: input.targetLanguageCode,
			sourceLanguageCode: input.sourceLanguageCode,
		})

		await this.sentenceTranslationRepository.createSentenceTranslation({
			sentenceId: input.sentenceId,
			translation: result.translatedText,
		})

		yield { type: 'chunk', text: result.translatedText }
		yield { type: 'done' }

		// Списать деньги за перевод
		const symbolsCount = result.translatedText.length

		await this.commandBus.execute(
			new YandexTranslateUsageBalanceChargeCommand({
				userId: input.userId,
				symbolsCount,
			}),
		)
	}
}
