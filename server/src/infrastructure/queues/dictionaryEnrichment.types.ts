export const DICTIONARY_DEEP_SECTIONS_JOB_NAME = 'generate-dictionary-deep-sections'
export const WORD_SENSE_IMAGE_JOB_NAME = 'generate-word-sense-image'

export type DictionaryDeepSectionsJobData = { translationId: number }
export type WordSenseImageJobData = { wordSenseId: number }
export type DictionaryEnrichmentJobData = DictionaryDeepSectionsJobData | WordSenseImageJobData
