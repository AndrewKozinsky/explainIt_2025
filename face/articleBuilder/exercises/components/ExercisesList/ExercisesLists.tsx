// import React from 'react'
import ExercisesType from '../../../articlesData/exercisesType'
import Switcher, { SwitcherItem } from '../../../../ui/Switcher/Switcher'
// import { ExercisesManagerTypes } from '../../logic/exercisesManagerTypes'
// import { exercisesLogic, useExercisesModalStore } from '../../store/store'
import s from './ExercisesLists.module.scss'

type ExercisesListsProps = {
	exercises: ExercisesType.Exercise[]
}

/** Списки упражнений для прохождения. */
function ExercisesLists(props: ExercisesListsProps) {
	const { exercises } = props

	// const { store } = useExercisesModalStore()

	// const { exercisesWriting, exercisesOral } = store

	return (
		<div className={s.generalWrapper}>
			<ExercisesList header='Письменная' exercises={exercises} />
			<ExercisesList header='Голосовая' exercises={exercises} />
		</div>
	)
}

export default ExercisesLists

type ExercisesListProps = {
	header: string
	exercises: ExercisesType.Exercise[]
}

/** Список упражнений для прохождения с заголовком. */
function ExercisesList(props: ExercisesListProps) {
	const { header, exercises } = props

	const items: SwitcherItem[] = exercises.map((exercise) => {
		return {
			text: exercise.rusSentence,
			// isCurrent: exercise.isCurrent,
			isCurrent: false,
			// onClick: () => exercisesLogic.switchToExerciseById(exercise.id),
			onClick: () => {},
		}
	})

	return (
		<div className={s.partWrapper}>
			<h2 className={s.partHeader}>{header}</h2>
			<Switcher items={items} orientation='vertical' />
		</div>
	)
}
