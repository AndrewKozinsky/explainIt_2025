'use client'

import ExerciseContent from '../ExerciseContent/ExerciseContent'
import ExercisesLists from '../ExercisesList/ExercisesLists'
import Header from '../../../Header/Header'
import ExerciseTypeSwitch from '../ExerciseTypeSwitch/ExerciseTypeSwitch'
import './ExercisesBlock.scss'

type ExercisesBlockProps = {
	exercisesBlockId: number
}

/** Модальное окно прохождения упражнений */
export function ExercisesBlock(props: ExercisesBlockProps) {
	const { exercisesBlockId } = props

	return (
		<div className='exercises'>
			<Header
				config={{
					type: 'header',
					tag: 'h2',
					style: 'h2',
					text: 'Тренировка',
				}}
			/>
			<div className='exercises__content'>
				<div className='exercises__content__left'>
					<ExerciseTypeSwitch exercisesBlockId={exercisesBlockId} />
					<ExercisesLists exercisesBlockId={exercisesBlockId} />
				</div>
				<ExerciseContent exercisesBlockId={exercisesBlockId} />
			</div>
		</div>
	)
}
