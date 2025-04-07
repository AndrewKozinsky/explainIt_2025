// import React, { useEffect } from 'react'
// import { useExercisesModalStore } from '../../../../store/store'

/**
 * Хук при изменении упражнения ставит фокус на поле ввода и стирает существующее значение.
 * @param inputRef — ссылка на поле ввода перевода.
 */
/*export function usePrepareInput(inputRef: React.MutableRefObject<HTMLTextAreaElement | null>) {
	const exerciseId = useExercisesModalStore().store.currentExercise.id

	useEffect(
		function () {
			if (!inputRef.current) return

			inputRef.current.focus()
			inputRef.current.value = ''
		},
		[exerciseId],
	)
}*/
