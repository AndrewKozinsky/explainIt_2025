'use client'

// import Modal from '../../../../ui/Modal/Modal'
// import { useExercisesModalStore } from '../../store/store'
// import ExerciseContent from '../ExerciseContent/ExerciseContent'
import ExercisesLists from '../ExercisesList/ExercisesLists'
// import { useSetUpStore } from './fn/useSetUpStore'
import ExercisesType from '../../../articlesData/exercisesType'
import Header from '../../../components/Header/Header'
import './Exercises.scss'

type ExercisesProps = {
	exercisesObj: ExercisesType.ExercisesObj
}

/** Модальное окно прохождения упражнений */
export function Exercises(props: ExercisesProps) {
	const { exercisesObj } = props

	// const { store } = useExercisesModalStore()

	// useSetUpStore(exercises)

	// if (!store) return null

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
				<ExercisesLists exercises={exercisesObj.exercises} />
				{/*<ExerciseContent />*/}
			</div>
		</div>
	)
}
