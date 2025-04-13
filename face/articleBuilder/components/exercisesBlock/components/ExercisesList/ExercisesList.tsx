import { useContext } from 'react'
import { ExercisesContext } from '../../exercisesContext/exercisesContext'
import Switcher, { SwitcherItem } from '../../../../../ui/Switcher/Switcher'
import './ExercisesList.scss'

/** Списки упражнений для прохождения. */
function ExercisesList() {
	const { exercisesBlock, switchToExercise } = useContext(ExercisesContext)

	const items: SwitcherItem[] = exercisesBlock.exercises.map((exercise) => {
		return {
			text: exercise.rusSentence,
			isCurrent: exercise.id === exercisesBlock.currentExercisesId,
			onClick: () => switchToExercise(exercise.id),
		}
	})

	return (
		<div className='exercises-list'>
			<Switcher items={items} orientation='vertical' />
		</div>
	)
}

export default ExercisesList
