import cn from 'classnames'
import { useIsShownResultInOralExercise } from '../commonFn'
import s from './RusExercise.module.scss'

// Компонент с предложением на русском языке, которое нужно перевести
import exercisesLogic from '../../../logic/exercisesLogic'

type RusExerciseProps = {
	exercisesBlockId: number
}

function RusExercise(props: RusExerciseProps) {
	const { exercisesBlockId } = props

	const exercise = exercisesLogic.useGetCurrentSentence(exercisesBlockId)
	const isShownResultInOralExercise = useIsShownResultInOralExercise(exercisesBlockId)

	if (!exercise) return null

	return (
		<div className={s.wrapper}>
			{exercise.note && <p className={s.note}>{exercise.note}</p>}
			<p className={cn(s.sentence, isShownResultInOralExercise && s['sentence--gray'])}>{exercise.rusSentence}</p>
		</div>
	)
}

export default RusExercise
