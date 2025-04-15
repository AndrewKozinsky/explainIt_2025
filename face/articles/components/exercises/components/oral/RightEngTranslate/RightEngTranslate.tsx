import { useGetExerciseCorrectTranslations } from './fn/commonFn'
import './RightEngTranslate.scss'

/** Первый правильный вариант перевода предложения для голосовых упражнений */
function RightEngTranslate() {
	const correctTranslations = useGetExerciseCorrectTranslations()
	if (!correctTranslations.length) return null

	return <p className='exercises-right-eng-translate'>{correctTranslations[0].engSentences[0]}</p>
}

export default RightEngTranslate
