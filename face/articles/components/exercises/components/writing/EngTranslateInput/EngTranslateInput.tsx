import { useContext } from 'react'
import cn from 'classnames'
import { ExercisesContext } from '../../../logic/exercisesContext'
import { ExercisesContextType } from '../../../logic/exercisesContextTypes'
import { exercisesLogic } from '../../../logic/exercisesLogic'
import { useGetCheckTranslationOrMoveToAnotherExercise } from '../../common/BottomButton/fn/buttonFn'
import { onEnterKeyDown } from './fn/getOnEnterKeyDown'
import { useGetOnInput } from './fn/onKeyDown'
import './EngTranslateInput.scss'

/** Поле для ввода перевода русского предложения */
function EngTranslateInput() {
	const { exercisesBlock } = useContext(ExercisesContext)

	const exercise = exercisesLogic.useGetCurrentExercise()

	let additionalTextClass = ''
	if (exercisesBlock.analysis.status === ExercisesContextType.AnalysisStatus.visible) {
		additionalTextClass = exercisesBlock.analysis.isTranslateCorrect
			? 'eng-translate-input--green-text'
			: 'eng-translate-input--red-text'
	}

	const onInput = useGetOnInput()
	const checkTranslationOrMoveToAnotherExercise = useGetCheckTranslationOrMoveToAnotherExercise()

	if (!exercise) return null

	return (
		<textarea
			className={cn('eng-translate-input', additionalTextClass)}
			placeholder='Перевод...'
			onInput={onInput}
			onKeyDown={(e) => onEnterKeyDown(e, checkTranslationOrMoveToAnotherExercise)}
			value={exercise.userTranslate}
			data-testid='exercise-content-eng-sentence-text'
		/>
	)
}

export default EngTranslateInput
