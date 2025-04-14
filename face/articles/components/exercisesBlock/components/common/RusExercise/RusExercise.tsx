import cn from 'classnames'
import { useContext } from 'react'
import { ExercisesContext } from '../../../logic/exercisesContext'
import { useIsShownResultInOralExercise } from '../commonFn'
import s from './RusExercise.module.scss'
// import exercisesLogic from '../../../logic/exercisesLogic'

// Компонент с предложением на русском языке, которое нужно перевести
function RusExercise() {
	const { useGetCurrentExercise } = useContext(ExercisesContext)
	const exercise = useGetCurrentExercise()

	const isShownResultInOralExercise = useIsShownResultInOralExercise()

	if (!exercise) return null

	return (
		<div className={s.wrapper}>
			{exercise.note && <p className={s.note}>{exercise.note}</p>}
			<p className={cn(s.sentence, isShownResultInOralExercise && s['sentence--gray'])}>{exercise.rusSentence}</p>
		</div>
	)
}

export default RusExercise
