import { useCallback, useMemo } from 'react'
import { useGetHotKeysHandler } from '../../../../../../utils/hotKeysHandler'
import { ExercisesManagerTypes } from '../../../../logic/exercisesManagerTypes'
import { exercisesLogic, useExercisesModalStore } from '../../../../store/store'

/** Возвращает текст кнопки действия в модальном окне прохождения упражнений. */
export function useGetButtonText() {
	const { currentExercise: exercise, analysis } = useExercisesModalStore().store

	return useMemo(
		function () {
			// Если только переключили на предложение, но не переводили (письменное и голосовое)
			if (!exercise.userTranslate && analysis.status === ExercisesManagerTypes.AnalysisStatus.hidden) {
				return 'Правильный вариант'
			}
			// Если перевод написали, но не проверяли (письменное)
			else if (exercise.userTranslate && analysis.status === ExercisesManagerTypes.AnalysisStatus.hidden) {
				return 'Проверить'
			}
			// Если проверка загружается (письменное)
			else if (exercise.userTranslate && analysis.status === ExercisesManagerTypes.AnalysisStatus.loading) {
				return 'Проверка...'
			}
			// Если проверка показана (письменное и голосовое)
			else {
				if (exercise.type === ExercisesManagerTypes.ExerciseType.write) {
					const nextExercise = exercisesLogic.getNextWritingExercise()

					if (nextExercise) {
						return 'Следующее'
					} else {
						return 'На голосовую тренировку'
					}
				} else {
					const nextExercise = exercisesLogic.getNextOralExercise()

					if (nextExercise) {
						return 'Следующее'
					} else {
						return 'На письменную тренировку'
					}
				}
			}
		},
		[exercise.userTranslate, analysis.status],
	)
}

/** Возвращает функция срабатывающую при нажатии на кнопку действия в модальном окне прохождения упражнений */
export function useGetOnButtonClick() {
	const { currentExercise: exercise, analysis } = useExercisesModalStore().store

	return useCallback(
		function () {
			// Если не проверяли (письменное и голосовое)
			if (analysis.status === ExercisesManagerTypes.AnalysisStatus.hidden) {
				exercisesLogic.checkCurrentExercise()
				return
			}

			// Если проверка показана (письменное и голосовое)...

			if (exercise.type === ExercisesManagerTypes.ExerciseType.write) {
				const nextExercise = exercisesLogic.getNextWritingExercise()

				if (nextExercise) {
					exercisesLogic.switchToExerciseById(nextExercise.id)
				} else {
					exercisesLogic.switchToFirstOralExercise()
				}
			} else {
				const nextExercise = exercisesLogic.getNextOralExercise()

				if (nextExercise) {
					exercisesLogic.switchToExerciseById(nextExercise.id)
				} else {
					exercisesLogic.switchToFirstWritingExercise()
				}
			}
		},
		[exercise.type, analysis.status],
	)
}

/** Назначает обработчик на нажатие клавиши Enter в модальном окне прохождения упражнений. */
export function useSetEnterKeyHandler() {
	const handler = useGetOnButtonClick()
	useGetHotKeysHandler({ key: 'Enter', handler: handler })
}
