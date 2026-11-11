import { DeepSeekModels, OpenAIModels } from 'types/AIModels'
import { OpenAIImageModels } from 'types/imageGenerationModels'
import { LLM_TRANSLATION_TIMEOUT_MS } from 'utils/time'
import { WordSenseVisualAspect, WordSenseVisualKind } from 'models/universalPhraseTranslation/wordSense.service.model'

export const DICTIONARY_ROUTER_MODEL = DeepSeekModels.Flash
export const DICTIONARY_WRITER_MODEL = OpenAIModels.Mini

/** Маршрутизатор и писатель вместе обязаны уложиться в общий синхронный лимит запроса. */
export const DICTIONARY_ROUTER_TIMEOUT_MS = 8_000
export const DICTIONARY_WRITER_TIMEOUT_MS = LLM_TRANSLATION_TIMEOUT_MS - DICTIONARY_ROUTER_TIMEOUT_MS

export const WORD_KINDS = [
	'lexical',
	'inflected',
	'functional',
	'idiom',
	'proper',
	'free',
	'sentence',
	'other',
] as const
export type WordKind = (typeof WORD_KINDS)[number]

/** У имён, свободных сочетаний и предложений нет материала для дополнительных разделов. */
export const WORD_KINDS_WITHOUT_DEEP_SECTIONS: readonly WordKind[] = ['proper', 'free', 'sentence']

export const WORD_SENSE_IMAGE_MODEL = OpenAIImageModels.Flare
export const WORD_SENSE_IMAGE_QUALITY = 'low'
export const WORD_SENSE_IMAGE_STORED_WIDTH = 800
export const WORD_SENSE_IMAGE_STORED_QUALITY = 75

/** Стороны кратны 16, площадь не меньше 655360: меньшие размеры Images API отклоняет. */
export const WORD_SENSE_IMAGE_SIZES: Record<WordSenseVisualAspect, { width: number; height: number }> = {
	landscape: { width: 1024, height: 640 },
	strip: { width: 1536, height: 512 },
}

export const WORD_SENSE_STYLE_SAMPLE_FILES: Record<WordSenseVisualKind, string> = {
	scene: 'scene.webp',
	contrast: 'contrast.webp',
	comic: 'comic.webp',
}
