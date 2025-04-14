import cn from 'classnames'
import { useContext } from 'react'
import { ExercisesContext } from '../../../logic/exercisesContext'
import { useIsShownResultInOralExercise } from '../commonFn'
import './RusExercise.scss'

// Компонент с предложением на русском языке, которое нужно перевести
function RusExercise() {
	const { useGetCurrentExercise } = useContext(ExercisesContext)
	const exercise = useGetCurrentExercise()

	const isShownResultInOralExercise = useIsShownResultInOralExercise()

	if (!exercise) return null

	return (
		<div className='exercise-content-rus-sentence'>
			{exercise.note && <p className='exercise-content-rus-sentence__note'>{exercise.note}</p>}
			<p
				className={cn(
					'exercise-content-rus-sentence__text',
					isShownResultInOralExercise && 'exercise-content-rus-sentence__sentence--gray',
				)}
			>
				{exercise.rusSentence}
			</p>
		</div>
	)
}

export default RusExercise
