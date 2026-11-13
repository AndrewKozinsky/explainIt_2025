import { AiModel, DeepSeekModels, GoogleGeminiModels, MimoModels, OpenAIModels, ZaiModels } from 'types/AIModels'
import type { ImageGenerationTokenUsage } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationProvider.interface'
import type { LlmTokenUsage } from 'infrastructure/llmProviderAdapter/llmTokenUsage'
import type { LlmTokenPrice } from 'infrastructure/mainConfig/llmTokenPrice'
import type { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

/**
 * Расчёт стоимости запросов к ИИ в долларах по ценам поставщиков из mainConfig.
 * Функции чистые: цены передаются аргументом, результат — дробные доллары.
 * В микродоллары для списания сумма переводится функцией costInDollarsToMicrodollarsCharge.
 */

type MainConfig = ReturnType<MainConfigService['get']>

const TOKENS_IN_MILLION = 1_000_000

/** Цена токенов LLM из конфигурации для конкретной модели. */
export function getLlmTokenPrice(config: MainConfig, model: AiModel): LlmTokenPrice {
	const priceByModel: Record<AiModel, LlmTokenPrice> = {
		[OpenAIModels.Nano]: config.openAI.llmPriceInDollars.nano,
		[OpenAIModels.Mini]: config.openAI.llmPriceInDollars.mini,
		[OpenAIModels.Standard]: config.openAI.llmPriceInDollars.standard,
		[DeepSeekModels.Flash]: config.deepSeek.llmPriceInDollars.flash,
		[DeepSeekModels.Pro]: config.deepSeek.llmPriceInDollars.pro,
		[ZaiModels.Flash]: config.zai.llmPriceInDollars.flash,
		[ZaiModels.Pro]: config.zai.llmPriceInDollars.pro,
		[MimoModels.Flash]: config.mimo.llmPriceInDollars.flash,
		[MimoModels.Pro]: config.mimo.llmPriceInDollars.pro,
		[GoogleGeminiModels.FlashLite]: config.gemini.llmPriceInDollars.flashLite,
		[GoogleGeminiModels.Flash]: config.gemini.llmPriceInDollars.flash,
		[GoogleGeminiModels.Pro]: config.gemini.llmPriceInDollars.pro,
	}

	return priceByModel[model]
}

/**
 * Стоимость запроса к LLM. Кэшированные входные токены считаются по своей цене, остальные — по полной.
 * lowPriority — запрос OpenAI с service_tier flex: он стоит вдвое дешевле. У других поставщиков флаг не влияет на цену.
 */
export function calculateLlmCostInDollars(input: {
	model: AiModel
	price: LlmTokenPrice
	usage: LlmTokenUsage
	lowPriority?: boolean
}): number {
	const { price, usage } = input
	const cachedInputTokens = Math.min(Math.max(usage.cachedInputTokens, 0), usage.inputTokens)
	const uncachedInputTokens = usage.inputTokens - cachedInputTokens

	const cost =
		(uncachedInputTokens * price.inputPerMillionTokens +
			cachedInputTokens * price.cachedInputPerMillionTokens +
			usage.outputTokens * price.outputPerMillionTokens) /
		TOKENS_IN_MILLION

	const isOpenAiFlex = input.lowPriority === true && Object.values<AiModel>(OpenAIModels).includes(input.model)

	return isOpenAiFlex ? cost / 2 : cost
}

/** Стоимость одной генерации картинки моделью OpenAI по токенам из ответа. */
export function calculateOpenAiImageCostInDollars(input: {
	price: MainConfig['openAI']['imagePriceInDollars']
	usage: ImageGenerationTokenUsage
}): number {
	const { price, usage } = input

	return (
		(usage.textInputTokens * price.textInputPerMillionTokens +
			usage.imageInputTokens * price.imageInputPerMillionTokens +
			usage.imageOutputTokens * price.imageOutputPerMillionTokens) /
		TOKENS_IN_MILLION
	)
}

/**
 * Стоимость одной картинки FLUX 3: цена зависит от яруса размера, в который попадает площадь картинки.
 * Если картинка больше самого крупного яруса, берётся цена самого крупного.
 */
export function calculateFlux3ImageCostInDollars(input: {
	tiers: MainConfig['blackForestLabs']['flux3ImagePriceInDollars']
	width: number
	height: number
}): number {
	const megapixels = (input.width * input.height) / 1_000_000
	const tier = input.tiers.find((priceTier) => megapixels <= priceTier.maxMegapixels) ?? input.tiers.at(-1)

	return tier?.pricePerImage ?? 0
}

/** Примерное число токенов текста: около четырёх символов на токен. Нужно там, где поставщик не сообщает токены. */
export function estimateTextTokens(text: string): number {
	return Math.ceil(text.length / 4)
}

/**
 * Стоимость озвучки OpenAI. API не возвращает число токенов, поэтому текст на входе
 * оценивается по числу символов, а аудио на выходе — по длительности полученного файла.
 */
export function calculateOpenAiTtsCostInDollars(input: {
	price: MainConfig['openAI']['ttsPriceInDollars']
	inputText: string
	audioSeconds: number
}): number {
	const textCost = (estimateTextTokens(input.inputText) * input.price.textInputPerMillionTokens) / TOKENS_IN_MILLION
	const audioCost = (input.audioSeconds / 60) * input.price.audioOutputPerMinute

	return textCost + audioCost
}

/** Стоимость распознавания речи по длительности аудио и цене за минуту. */
export function calculateSpeechToTextCostInDollars(input: { pricePerMinute: number; audioSeconds: number }): number {
	return (Math.max(input.audioSeconds, 0) / 60) * input.pricePerMinute
}
