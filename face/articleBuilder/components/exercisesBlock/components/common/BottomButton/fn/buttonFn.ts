import { useCallback, useContext, useMemo } from 'react'
import { ExercisesContext } from '../../../../exercisesContext/exercisesContext'
import { ExercisesContextType } from '../../../../exercisesContext/exercisesStoreTypes'
import { useGetHotKeysHandler } from '../../../../../../../utils/hotKeysHandler'

/** Возвращает текст кнопки действия в модальном окне прохождения упражнений. */
export function useGetButtonText() {
	const { useGetCurrentExercise, exercisesBlock, getNextExercise } = useContext(ExercisesContext)
	const exercise = useGetCurrentExercise()

	const { analysis } = exercisesBlock

	return useMemo(
		function () {
			if (!exercise) return ''

			// Если только переключили на предложение, но не переводили (письменное и голосовое)
			if (!exercise.userTranslate && analysis.status === ExercisesContextType.AnalysisStatus.hidden) {
				return 'Правильный вариант'
			}
			// Если перевод написали, но не проверяли (письменное)
			else if (exercise.userTranslate && analysis.status === ExercisesContextType.AnalysisStatus.hidden) {
				return 'Проверить'
			}
			// Если проверка загружается (письменное)
			else if (exercise.userTranslate && analysis.status === ExercisesContextType.AnalysisStatus.loading) {
				return 'Проверка...'
			}
			// Если проверка показана (письменное и голосовое)
			else {
				const nextExercise = getNextExercise()

				if (nextExercise) {
					return 'Следующее'
				} else {
					return exercisesBlock.currentExerciseType === ExercisesContextType.ExerciseType.write
						? 'На голосовую тренировку'
						: 'На письменную тренировку'
				}
			}
		},
		[exercise?.userTranslate, analysis.status],
	)
}

/** Возвращает функция срабатывающую при нажатии на кнопку действия в модальном окне прохождения упражнений */
export function useGetOnButtonClick() {
	const {
		useGetCurrentExercise,
		exercisesBlock,
		switchToExercise,
		switchToFirstExercise,
		switchExercisesType,
		getNextExercise,
		checkCurrentExercise,
	} = useContext(ExercisesContext)
	const exercise = useGetCurrentExercise()

	const { analysis } = exercisesBlock

	return useCallback(
		function () {
			if (!exercise) return

			// Если не проверяли (письменное и голосовое)
			if (analysis.status === ExercisesContextType.AnalysisStatus.hidden) {
				checkCurrentExercise()
				return
			}

			// Если проверка показана...
			const nextExercise = getNextExercise()

			if (nextExercise) {
				switchToExercise(nextExercise.id)
			} else {
				switchToFirstExercise()
				switchExercisesType()
			}
		},
		[analysis.status],
	)
}

/** Назначает обработчик на нажатие клавиши Enter в модальном окне прохождения упражнений. */
export function useSetEnterKeyHandler() {
	const handler = useGetOnButtonClick()
	useGetHotKeysHandler({ key: 'Enter', handler: handler })
}
