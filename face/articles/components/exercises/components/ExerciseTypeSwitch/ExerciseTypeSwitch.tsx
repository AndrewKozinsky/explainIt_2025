'use client'

import { useContext } from 'react'
import cn from 'classnames'
import ArrowCircle from '../../../ArrowCircle/ArrowCircle'
import { useGetOnExerciseTypeButtonClick } from './fn/getCurrentExercisesType'
import { ExercisesContext } from '../../logic/exercisesContext'
import { ExercisesContextType } from '../../logic/exercisesContextTypes'
import './ExerciseTypeSwitch.scss'

function ExerciseTypeSwitch() {
	const { exercisesBlock } = useContext(ExercisesContext)

	return (
		<div className='exercises-type-switch'>
			<Item
				text='Письменная'
				isCurrent={exercisesBlock.currentExerciseType === ExercisesContextType.ExerciseType.write}
			/>
			<Item
				text='Голосовая'
				isCurrent={exercisesBlock.currentExerciseType === ExercisesContextType.ExerciseType.oral}
			/>
		</div>
	)
}

export default ExerciseTypeSwitch

type ItemProps = {
	isCurrent: boolean
	text: string
}

function Item(props: ItemProps) {
	const { isCurrent, text } = props

	const onExerciseTypeButtonClick = useGetOnExerciseTypeButtonClick(isCurrent)

	return (
		<button
			className={cn(
				'exercises-type-switch__item',
				isCurrent ? 'exercises-type-switch__item--current' : 'exercises-type-switch__item--another',
			)}
			onClick={onExerciseTypeButtonClick}
		>
			<ArrowCircle />
			<span className='exercises-type-switch__item-text'>{text}</span>
		</button>
	)
}
