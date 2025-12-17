import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useGetSelectedPhrase } from '_pages/books/reading/lib/getSelectedPhraseType'

type AnalysisDetails = {
	meaning_in_context: string
	usage: string
	comparison: string
	image_or_feeling: string
	summary: string
}
type AnalysisDetailsPopulated = {
	meaning_in_context?: {
		header: string
		value: string
	}
	usage?: {
		header: string
		value: string
	}
	comparison?: {
		header: string
		value: string
	}
}

export function useGetParsedAnalysis(): AnalysisDetailsPopulated {
	const selectedPhrase = useGetSelectedPhrase<ChapterTextStructurePopulated.SuccessPhrase>()

	const rawAnalysis = selectedPhrase.analysis.analysis
	const populatedDetails: AnalysisDetailsPopulated = {
		meaning_in_context: {
			header: 'Смысл',
			value: rawAnalysis,
		},
	}

	try {
		const parsed: AnalysisDetails = JSON.parse(rawAnalysis)

		if (parsed.meaning_in_context) {
			populatedDetails.meaning_in_context = {
				header: 'Смысл',
				value: parsed.meaning_in_context,
			}
		}
		if (parsed.usage) {
			populatedDetails.usage = {
				header: 'Использование',
				value: parsed.usage,
			}
		}
		if (parsed.comparison) {
			populatedDetails.comparison = {
				header: 'Синонимы',
				value: parsed.comparison,
			}
		}
	} catch (e) {}

	return populatedDetails
}
