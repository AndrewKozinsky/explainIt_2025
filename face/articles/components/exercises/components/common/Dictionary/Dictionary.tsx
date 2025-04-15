import DictionaryWord from '../DictionaryWord/DictionaryWord'
import { exercisesLogic } from '../../../logic/exercisesLogic'
import './Dictionary.scss'

/** Список русских слов с переводом на английский для правильного перевода предложения. */
function Dictionary() {
	const exercise = exercisesLogic.useGetCurrentExercise()
	const words = exercise?.words

	if (!words) return null

	return (
		<div className='exercises-dictionary-wrapper'>
			{words.map((word) => {
				return <DictionaryWord wordObj={word} key={word.engWord} />
			})}
		</div>
	)
}

export default Dictionary
