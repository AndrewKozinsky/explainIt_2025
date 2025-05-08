import ExercisesType from '../../../../../articleTypes/exercisesType'
import Transcription from '../../../../Transcription/Transcription'
import { useGetEngTranscription } from './fn/componentHandlers'
import './CorrectTranslationsList.scss'

type CorrectTranslationsListProps = {
	correctTranslations: ExercisesType.EngSentence[]
}

/** Список правильных вариантов перевода */
function CorrectTranslationsList(props: CorrectTranslationsListProps) {
	const { correctTranslations } = props

	const engSentences: string[] = []

	correctTranslations.forEach((translation) => {
		translation.engSentences.forEach((tr) => {
			engSentences.push(tr)
		})
	})

	return (
		<div className='exercises-correct-translations'>
			{engSentences.map((sentence, i) => {
				return (
					<div
						className='exercises-correct-translations__item'
						key={i}
						data-testid='exercise-correct-translations-item'
					>
						<p>{sentence}</p>
						<TranscriptionBlock engSentence={sentence} />
					</div>
				)
			})}
		</div>
	)
}

export default CorrectTranslationsList

type TranscriptionBlockProps = {
	engSentence: string
}

function TranscriptionBlock(props: TranscriptionBlockProps) {
	const { engSentence } = props

	const engTranscription = useGetEngTranscription(engSentence)
	if (!engTranscription) {
		return null
	}

	return <Transcription engSentence={engTranscription.sentence} />
}
