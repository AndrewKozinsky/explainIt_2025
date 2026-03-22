import Spinner from 'ui/Spinner/Spinner'
import { ChapterTextStructurePopulated } from '_pages/media/reading/readingStore'

type SentenceWordProps = {
	translation: ChapterTextStructurePopulated.Sentence['translation']
}

export function SentenceWordLoading(props: SentenceWordProps) {
	const { translation } = props

	const shouldShow = translation.sentenceTranslation && translation.isLoading && !translation.wordAnalysis

	if (!shouldShow) {
		return null
	}

	return (
		<p className='chapter-content__word-loading'>
			<Spinner size='small' />
			Загрузка перевода слова…
		</p>
	)
}

export function SentenceWordNotFound(props: SentenceWordProps) {
	const { translation } = props
	const shouldShow = translation.sentenceTranslation && !translation.isLoading && !translation.wordAnalysis

	if (!shouldShow) {
		return null
	}

	return (
		<p className='chapter-content__word-not-found'>
			Перевод выделенного слова не найден. Попробуйте понять значение по переводу предложения.
		</p>
	)
}
