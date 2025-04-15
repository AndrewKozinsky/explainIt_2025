'use client'

import ExercisesType from '../../../../articleTypes/exercisesType'
import ExerciseContent from '../ExerciseContent/ExerciseContent'
import ExercisesList from '../ExercisesList/ExercisesList'
import Header from '../../../Header/Header'
import ExerciseTypeSwitch from '../ExerciseTypeSwitch/ExerciseTypeSwitch'
import { ExercisesContext } from '../../logic/exercisesContext'
import { useGetExercisesData } from '../../logic/useSetUpExercisesContext'
import './ExercisesBlock.scss'

type ExercisesBlockProps = {
	exercises: ExercisesType.Exercise[]
}

/** Блок прохождения упражнений */
export function ExercisesBlock(props: ExercisesBlockProps) {
	const { exercises } = props

	const contextValue = useGetExercisesData(exercises)

	return (
		<ExercisesContext.Provider value={contextValue}>
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
						<ExerciseTypeSwitch />
						<ExercisesList />
					</div>
					<ExerciseContent />
				</div>
			</div>
		</ExercisesContext.Provider>
	)
}
