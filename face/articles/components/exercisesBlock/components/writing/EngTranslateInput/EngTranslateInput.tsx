import { useContext, useRef } from 'react'
import cn from 'classnames'
import { ExercisesContext } from '../../../logic/exercisesContext'
import { ExercisesContextType } from '../../../logic/exercisesStoreTypes'
import { onEnterKeyDown } from './fn/getOnEnterKeyDown'
import { useGetOnInput } from './fn/onKeyDown'
import { usePrepareInput } from './fn/setFocusToInput'
import './EngTranslateInput.scss'

/** Поле для ввода перевода русского предложения */
function EngTranslateInput() {
	const { exercisesBlock } = useContext(ExercisesContext)
	const textareaRef = useRef<null | HTMLTextAreaElement>(null)

	usePrepareInput(textareaRef)

	let additionalTextClass = ''
	if (exercisesBlock.analysis.status === ExercisesContextType.AnalysisStatus.visible) {
		additionalTextClass = exercisesBlock.analysis.isTranslateCorrect
			? 'eng-translate-input--green-text'
			: 'eng-translate-input--red-text'
	}

	const onInput = useGetOnInput()

	return (
		<textarea
			className={cn('eng-translate-input', additionalTextClass)}
			placeholder='Перевод...'
			onInput={onInput}
			onKeyDown={onEnterKeyDown}
			ref={textareaRef}
		/>
	)
}

export default EngTranslateInput
