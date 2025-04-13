import { useContext } from 'react'
import DictionaryWord from '../DictionaryWord/DictionaryWord'
import { ExercisesContext } from '../../../exercisesContext/exercisesContext'
import s from './Dictionary.module.scss'

/** Список русских слов с переводом на английский для правильного перевода предложения. */
function Dictionary() {
	const { useGetCurrentExercise } = useContext(ExercisesContext)
	const exercise = useGetCurrentExercise()
	const words = exercise?.words

	if (!words) return null

	return (
		<div className={s.wrapper}>
			{words.map((word) => {
				return <DictionaryWord wordObj={word} key={word.engWord} />
			})}
		</div>
	)
}

export default Dictionary
