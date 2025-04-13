import { useContext, useRef } from 'react'
import cn from 'classnames'
import { ExercisesContext } from '../../../exercisesContext/exercisesContext'
import { ExercisesContextType } from '../../../exercisesContext/exercisesStoreTypes'
import { onEnterKeyDown } from './fn/getOnEnterKeyDown'
import { useGetOnInput } from './fn/onKeyDown'
import { usePrepareInput } from './fn/setFocusToInput'
import s from './EngTranslateInput.module.scss'

/** Поле для ввода перевода русского предложения */
function EngTranslateInput() {
	const { exercisesBlock } = useContext(ExercisesContext)
	const textareaRef = useRef<null | HTMLTextAreaElement>(null)

	usePrepareInput(textareaRef)

	let additionalTextClass = ''
	if (exercisesBlock.analysis.status === ExercisesContextType.AnalysisStatus.visible) {
		additionalTextClass = exercisesBlock.analysis.isTranslateCorrect ? s.greenText : s.redText
	}

	const onInput = useGetOnInput()

	return (
		<textarea
			className={cn(s.textarea, additionalTextClass)}
			placeholder='Перевод...'
			onInput={onInput}
			autoFocus
			onKeyDown={onEnterKeyDown}
			ref={textareaRef}
		/>
	)
}

export default EngTranslateInput
