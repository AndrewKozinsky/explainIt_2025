import { Injectable, Logger } from '@nestjs/common'
import { UserRepository } from 'repo/user.repository'
import { AiModel } from 'types/AIModels'
import { BillableAiFeature } from 'types/billableAiFeature'
import { FluxImageModels, OpenAIImageModels } from 'types/imageGenerationModels'
import { costInDollarsToMicrodollarsCharge } from 'utils/microdollars'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { ImageGenerationTokenUsage } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationProvider.interface'
import { LlmTokenUsage } from 'infrastructure/llmProviderAdapter/llmTokenUsage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { PosthogService } from 'infrastructure/posthog/posthog.service'
import {
	calculateFlux3ImageCostInDollars,
	calculateLlmCostInDollars,
	calculateOpenAiImageCostInDollars,
	calculateOpenAiTtsCostInDollars,
	calculateSpeechToTextCostInDollars,
	getLlmTokenPrice,
} from './aiUsageCost'

/** Поставщики распознавания речи с оплатой по длительности аудио. */
export type SpeechToTextProvider = 'sonioxRealtime' | 'deepgramPrerecorded'

/**
 * Баланс пользователя для запросов к ИИ.
 * Перед запросом проверяется, что баланс больше нуля; после — списывается реальная стоимость по ценам поставщика.
 * Последний запрос может увести баланс в минус: его стоимость известна только после ответа.
 * Ошибка списания не ломает ответ пользователю: она пишется в лог.
 */
@Injectable()
export class UserBalanceService {
	private readonly logger = new Logger(UserBalanceService.name)

	constructor(
		private userRepository: UserRepository,
		private mainConfig: MainConfigService,
		private posthog: PosthogService,
	) {}

	/** Бросает 402 BALANCE_EXHAUSTED, если баланс не больше нуля, и отправляет событие в аналитику. */
	async ensurePositiveBalanceOrThrow(userId: number, feature: BillableAiFeature): Promise<void> {
		if (await this.hasPositiveBalance(userId)) return

		await this.posthog.captureAiRequestBlockedByBalance(userId, feature)

		throw new CustomError(errorMessage.balanceExhausted, ErrorStatusCode.PaymentRequired_402)
	}

	/** Проверка без ошибки: для фоновых запросов, о которых пользователь не просил напрямую. */
	async hasPositiveBalance(userId: number): Promise<boolean> {
		const balance = await this.userRepository.getBalance(userId)

		return balance !== null && balance > 0
	}

	async chargeLlm(input: {
		userId: number
		feature: BillableAiFeature
		model: AiModel
		usage: null | LlmTokenUsage
		lowPriority?: boolean
	}): Promise<void> {
		// Поток прервался до того, как поставщик сообщил токены: списывать нечего.
		if (!input.usage) return

		const costInDollars = calculateLlmCostInDollars({
			model: input.model,
			price: getLlmTokenPrice(this.mainConfig.get(), input.model),
			usage: input.usage,
			lowPriority: input.lowPriority,
		})

		await this.charge(input.userId, input.feature, costInDollars)
	}

	/**
	 * Картинка OpenAI считается по токенам из ответа, FLUX 3 — по ярусу размера.
	 * Если OpenAI не вернул токены, картинка оценивается как самая дешёвая из ярусов FLUX, чтобы не остаться бесплатной.
	 */
	async chargeImageGeneration(input: {
		userId: number
		feature: BillableAiFeature
		model: string
		width: number
		height: number
		usage?: ImageGenerationTokenUsage
	}): Promise<void> {
		const config = this.mainConfig.get()
		const isOpenAiModel = Object.values<string>(OpenAIImageModels).includes(input.model)

		if (isOpenAiModel && input.usage) {
			const costInDollars = calculateOpenAiImageCostInDollars({
				price: config.openAI.imagePriceInDollars,
				usage: input.usage,
			})

			return this.charge(input.userId, input.feature, costInDollars)
		}

		if (isOpenAiModel) {
			this.logger.warn(`Image model ${input.model} returned no token usage; charging an estimate`)
		} else if (input.model !== FluxImageModels.Flux3) {
			this.logger.warn(`No price for image model ${input.model}; charging an estimate`)
		}

		const costInDollars = calculateFlux3ImageCostInDollars({
			tiers: config.blackForestLabs.flux3ImagePriceInDollars,
			width: input.width,
			height: input.height,
		})

		await this.charge(input.userId, input.feature, costInDollars)
	}

	/** Озвучка OpenAI: текст на входе оценивается по символам, аудио — по длительности файла. */
	async chargeOpenAiTts(input: {
		userId: number
		feature: BillableAiFeature
		inputText: string
		audioSeconds: number
	}): Promise<void> {
		const costInDollars = calculateOpenAiTtsCostInDollars({
			price: this.mainConfig.get().openAI.ttsPriceInDollars,
			inputText: input.inputText,
			audioSeconds: input.audioSeconds,
		})

		await this.charge(input.userId, input.feature, costInDollars)
	}

	async chargeSpeechToText(input: {
		userId: number
		feature: BillableAiFeature
		provider: SpeechToTextProvider
		audioSeconds: number
	}): Promise<void> {
		const config = this.mainConfig.get()
		const pricePerMinute =
			input.provider === 'sonioxRealtime'
				? config.soniox.priceInDollars.realtimeSpeechToTextPerMinute
				: config.deepgram.priceInDollars.prerecordedSpeechToTextPerMinute

		const costInDollars = calculateSpeechToTextCostInDollars({ pricePerMinute, audioSeconds: input.audioSeconds })

		await this.charge(input.userId, input.feature, costInDollars)
	}

	/** Списывает стоимость и сообщает аналитике, если именно это списание исчерпало баланс. */
	private async charge(userId: number, feature: BillableAiFeature, costInDollars: number): Promise<void> {
		const amountInMicrodollars = costInDollarsToMicrodollarsCharge(costInDollars)
		if (amountInMicrodollars <= 0) return

		try {
			const balanceAfter = await this.userRepository.decreaseBalance(userId, amountInMicrodollars)
			const balanceBefore = balanceAfter + amountInMicrodollars

			if (balanceBefore > 0 && balanceAfter <= 0) {
				await this.posthog.captureBalanceExhausted(userId, feature)
			}
		} catch (error) {
			this.logger.error(`Failed to charge user ${userId} for ${feature}`, error)
		}
	}
}
