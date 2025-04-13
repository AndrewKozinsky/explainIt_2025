'use client'

import React from 'react'
import cn from 'classnames'
import { ExercisesStoreType } from '../../../../../_pages/courseArticlePage/ExercisesStoreWrapper/exercisesStore/exercisesStoreTypes'
import ArrowCircle from '../../../ArrowCircle/ArrowCircle'
import { useGetCurrentExercisesType, useGetOnExerciseTypeButtonClick } from './fn/getCurrentExercisesType'
import './ExerciseTypeSwitch.scss'

type ExerciseTypeSwitchProps = {
	exercisesBlockId: number
}

function ExerciseTypeSwitch(props: ExerciseTypeSwitchProps) {
	const { exercisesBlockId } = props

	const currentExerciseType = useGetCurrentExercisesType(exercisesBlockId)

	return (
		<div className='exercise-type-switch'>
			<Item
				text='Письменная'
				isCurrent={currentExerciseType === ExercisesStoreType.ExerciseType.write}
				exercisesBlockId={exercisesBlockId}
			/>
			<Item
				text='Голосовая'
				isCurrent={currentExerciseType === ExercisesStoreType.ExerciseType.oral}
				exercisesBlockId={exercisesBlockId}
			/>
		</div>
	)
}

export default ExerciseTypeSwitch

type ItemProps = {
	isCurrent: boolean
	text: string
	exercisesBlockId: number
}

function Item(props: ItemProps) {
	const { isCurrent, text, exercisesBlockId } = props

	const onExerciseTypeButtonClick = useGetOnExerciseTypeButtonClick(isCurrent, exercisesBlockId)

	return (
		<button
			className={cn(
				'exercise-type-switch__item',
				isCurrent ? 'exercise-type-switch__item--current' : 'exercise-type-switch__item--another',
			)}
			onClick={onExerciseTypeButtonClick}
		>
			<ArrowCircle />
			<span className='exercise-type-switch__item-text'>{text}</span>
		</button>
	)
}
