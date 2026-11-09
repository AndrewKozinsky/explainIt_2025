import { ImageGenerationInput } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationProvider.interface'
import { WordSenseVisualAspect, WordSenseVisualKind } from 'models/universalPhraseTranslation/wordSense.service.model'
import { WORD_SENSE_IMAGE_MODEL, WORD_SENSE_IMAGE_QUALITY, WORD_SENSE_IMAGE_SIZES } from '../dictionaryArticleConfig'

const SERIES_STYLE =
	'Flat modern educational illustration. Simple rounded geometric shapes without outlines, soft muted warm-grey palette on a plain off-white background. Exactly one element is painted saturated orange-red: the element that carries the meaning. Everything else stays neutral grey. Faces and skin always stay neutral grey. One clear subject, generous empty space, readable at thumbnail size. No text, letters, numbers, logos, UI, borders or watermarks.'

const COMIC_RULE =
	'Three equal frames in a row separated by thin white gutters. Each frame clearly differs from the others.'

const STYLE_SAMPLE_PURPOSE =
	'style sample of the series: match its drawing style, palette, shape language and level of detail exactly; do not copy its subject'

/** Собирает запрос к генератору: общий стиль серии, замысел значения и образец стиля этого вида картинки. */
export function buildWordSenseImageInput(input: {
	kind: WordSenseVisualKind
	aspect: WordSenseVisualAspect
	visualPrompt: string
	styleSample: Buffer
}): ImageGenerationInput {
	const styleInstructions = input.kind === 'comic' ? `${SERIES_STYLE} ${COMIC_RULE}` : SERIES_STYLE

	return {
		model: WORD_SENSE_IMAGE_MODEL,
		prompt: `${styleInstructions}\n\n${input.visualPrompt}`,
		size: WORD_SENSE_IMAGE_SIZES[input.aspect],
		quality: WORD_SENSE_IMAGE_QUALITY,
		format: 'webp',
		references: [{ bytes: input.styleSample, mimeType: 'image/webp', purpose: STYLE_SAMPLE_PURPOSE }],
	}
}
