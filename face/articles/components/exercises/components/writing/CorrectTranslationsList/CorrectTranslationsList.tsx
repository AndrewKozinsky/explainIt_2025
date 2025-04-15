import ExercisesType from '../../../../../articleTypes/exercisesType'
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
			{engSentences.map((sentence, i) => (
				<p key={i}>{sentence}</p>
			))}
		</div>
	)
}

export default CorrectTranslationsList
