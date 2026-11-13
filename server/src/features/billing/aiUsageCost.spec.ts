import { DeepSeekModels, OpenAIModels } from 'types/AIModels'
import {
	calculateFlux3ImageCostInDollars,
	calculateLlmCostInDollars,
	calculateOpenAiImageCostInDollars,
	calculateOpenAiTtsCostInDollars,
	calculateSpeechToTextCostInDollars,
} from './aiUsageCost'

const deepSeekFlashPrice = {
	inputPerMillionTokens: 0.3,
	cachedInputPerMillionTokens: 0.006,
	outputPerMillionTokens: 1.2,
}

describe('calculateLlmCostInDollars', () => {
	it('считает некэшированный вход, кэшированный вход и выход по своим ценам', () => {
		const cost = calculateLlmCostInDollars({
			model: DeepSeekModels.Flash,
			price: deepSeekFlashPrice,
			usage: { inputTokens: 1_000_000, cachedInputTokens: 400_000, outputTokens: 100_000 },
		})

		// 600k × 0.3 + 400k × 0.006 + 100k × 1.2 (за 1M)
		expect(cost).toBeCloseTo(0.18 + 0.0024 + 0.12, 10)
	})

	it('делит стоимость пополам только для OpenAI flex', () => {
		const usage = { inputTokens: 1_000_000, cachedInputTokens: 0, outputTokens: 0 }

		expect(
			calculateLlmCostInDollars({
				model: OpenAIModels.Nano,
				price: deepSeekFlashPrice,
				usage,
				lowPriority: true,
			}),
		).toBeCloseTo(0.15, 10)
		expect(
			calculateLlmCostInDollars({
				model: DeepSeekModels.Flash,
				price: deepSeekFlashPrice,
				usage,
				lowPriority: true,
			}),
		).toBeCloseTo(0.3, 10)
	})

	it('не считает кэшированных токенов больше, чем всего входных', () => {
		const cost = calculateLlmCostInDollars({
			model: DeepSeekModels.Flash,
			price: deepSeekFlashPrice,
			usage: { inputTokens: 100, cachedInputTokens: 500, outputTokens: 0 },
		})

		expect(cost).toBeCloseTo((100 * 0.006) / 1_000_000, 15)
	})
})

describe('calculateOpenAiImageCostInDollars', () => {
	it('считает текст, референсы и картинку на выходе по своим ценам', () => {
		const cost = calculateOpenAiImageCostInDollars({
			price: { textInputPerMillionTokens: 5, imageInputPerMillionTokens: 8, imageOutputPerMillionTokens: 30 },
			usage: { textInputTokens: 1000, imageInputTokens: 2000, imageOutputTokens: 800 },
		})

		expect(cost).toBeCloseTo(0.005 + 0.016 + 0.024, 10)
	})
})

describe('calculateFlux3ImageCostInDollars', () => {
	const tiers = [
		{ maxMegapixels: 0.6, pricePerImage: 0.041 },
		{ maxMegapixels: 1, pricePerImage: 0.048 },
		{ maxMegapixels: 16, pricePerImage: 0.607 },
	]

	it('берёт цену яруса, в который попадает площадь картинки', () => {
		expect(calculateFlux3ImageCostInDollars({ tiers, width: 768, height: 768 })).toBe(0.041)
		expect(calculateFlux3ImageCostInDollars({ tiers, width: 1152, height: 576 })).toBe(0.048)
	})

	it('для картинки больше всех ярусов берёт самый крупный', () => {
		expect(calculateFlux3ImageCostInDollars({ tiers, width: 8000, height: 8000 })).toBe(0.607)
	})
})

describe('calculateOpenAiTtsCostInDollars', () => {
	it('складывает оценку текста на входе и минуты аудио на выходе', () => {
		const cost = calculateOpenAiTtsCostInDollars({
			price: { textInputPerMillionTokens: 0.6, audioOutputPerMinute: 0.015 },
			inputText: 'a'.repeat(400),
			audioSeconds: 30,
		})

		expect(cost).toBeCloseTo((100 * 0.6) / 1_000_000 + 0.0075, 10)
	})
})

describe('calculateSpeechToTextCostInDollars', () => {
	it('считает стоимость по секундам аудио', () => {
		expect(calculateSpeechToTextCostInDollars({ pricePerMinute: 0.0043, audioSeconds: 90 })).toBeCloseTo(
			0.00645,
			10,
		)
		expect(calculateSpeechToTextCostInDollars({ pricePerMinute: 0.0043, audioSeconds: -5 })).toBe(0)
	})
})
