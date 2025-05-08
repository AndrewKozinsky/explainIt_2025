import { useContext } from 'react'
import { ExercisesContext } from '../../logic/exercisesContext'
import Switcher, { SwitcherItem } from '../../../../../ui/Switcher/Switcher'
import { exercisesLogic } from '../../logic/exercisesLogic'
import './ExercisesList.scss'

/** Списки упражнений для прохождения. */
function ExercisesList() {
	const { exercisesBlock } = useContext(ExercisesContext)
	const switchToExercise = exercisesLogic.useGetSwitchToExercise()

	const items: SwitcherItem[] = exercisesBlock.exercises.map((exercise) => {
		return {
			text: exercise.rusSentence,
			isCurrent: exercise.id === exercisesBlock.currentExerciseId,
			onClick: () => switchToExercise(exercise.id),
		}
	})

	return (
		<div className='exercises-list'>
			<Switcher items={items} orientation='vertical' dataButtonTestId='exercises-list_item' />
		</div>
	)
}

export default ExercisesList
