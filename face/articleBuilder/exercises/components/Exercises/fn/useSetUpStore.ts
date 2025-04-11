import { useEffect } from 'react'
import ExercisesType from '../../../../articlesData/exercisesType'
import { exercisesLogic } from '../../../store/store'

/** Хук настраивает Хранилище модального окна прохождения упражнений. */
export function useSetUpStore(exercises: ExercisesType.Exercise[]) {
	useEffect(function () {
		exercisesLogic.initStore(exercises)
	}, [])
}
