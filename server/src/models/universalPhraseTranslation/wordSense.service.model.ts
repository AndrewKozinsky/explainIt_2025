import { LanguageCode, WordSenseImageStatus } from 'prisma/generated/enums'

export const WORD_SENSE_VISUAL_KINDS = ['scene', 'contrast', 'comic'] as const
export type WordSenseVisualKind = (typeof WORD_SENSE_VISUAL_KINDS)[number]

/** Обычная картинка всегда горизонтальная, лента предназначена только для комиксов. */
export type WordSenseVisualAspect = 'landscape' | 'strip'

/** Замысел иллюстрации значения: что и в каком формате нарисовать. */
export type WordSenseVisual = {
	kind: WordSenseVisualKind
	aspect: WordSenseVisualAspect
	prompt: string
}

export type WordSenseServiceModel = {
	id: number
	sourceLanguageCode: LanguageCode
	lemma: string
	gloss: string
	visualKind: null | string
	visualAspect: null | string
	visualPrompt: null | string
	imageS3Key: null | string
	imageStatus: WordSenseImageStatus
}
