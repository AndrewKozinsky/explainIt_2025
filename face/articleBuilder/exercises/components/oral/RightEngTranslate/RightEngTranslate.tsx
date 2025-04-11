import React from 'react'
import { useGetExerciseCorrectTranslations } from './fn/commonFn'
import s from './RightEngTranslate.module.scss'

/** Первый правильный вариант перевода предложения для голосовых упражнений */
function RightEngTranslate() {
	const correctTranslations = useGetExerciseCorrectTranslations()
	if (!correctTranslations.length) return null

	return <p className={s.paragraph}>{correctTranslations[0].engSentences[0]}</p>
}

export default RightEngTranslate
