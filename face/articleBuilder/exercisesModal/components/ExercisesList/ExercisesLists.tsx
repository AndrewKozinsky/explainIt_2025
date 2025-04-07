// import React from 'react'
// import Switcher, { SwitcherItem } from '../../../../ui/Switcher/Switcher'
// import { ExercisesManagerTypes } from '../../logic/exercisesManagerTypes'
// import { exercisesLogic, useExercisesModalStore } from '../../store/store'
// import s from './ExercisesLists.module.scss'

/** Списки упражнений для прохождения. */
/*function ExercisesLists() {
	const { store } = useExercisesModalStore()

	const { exercisesWriting, exercisesOral } = store

	return (
		<div className={s.generalWrapper}>
			<ExercisesList header="Письменная" exercises={exercisesWriting} />
			<ExercisesList header="Голосовая" exercises={exercisesOral} />
		</div>
	)
}*/

// export default ExercisesLists

/*type ExercisesListProps = {
	header: string
	exercises: ExercisesManagerTypes.Exercise[]
}*/

/** Список упражнений для прохождения с заголовком. */
/*function ExercisesList(props: ExercisesListProps) {
	const { header, exercises } = props

	const items: SwitcherItem[] = exercises.map((exercise) => {
		return {
			text: exercise.rusSentence,
			isCurrent: exercise.isCurrent,
			onClick: () => exercisesLogic.switchToExerciseById(exercise.id),
		}
	})

	return (
		<div className={s.partWrapper}>
			<h2 className={s.partHeader}>{header}</h2>
			<Switcher items={items} orientation="vertical" />
		</div>
	)
}*/
