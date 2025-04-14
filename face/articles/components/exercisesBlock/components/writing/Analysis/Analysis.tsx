import { useContext } from 'react'
import { ExercisesContext } from '../../../logic/exercisesContext'
import { ExercisesContextType } from '../../../logic/exercisesStoreTypes'
import AnalysisForTranslation from '../AnalysisForTranslation/AnalysisForTranslation'
import CorrectTranslationsList from '../CorrectTranslationsList/CorrectTranslationsList'

/** Анализ перевода введённого пользователем либо показ правильных вариантов */
function Analysis() {
	const { useGetCurrentExercise, exercisesBlock } = useContext(ExercisesContext)
	// console.log(exercisesBlock.exercises[0].userTranslate)
	const exercise = useGetCurrentExercise()
	if (!exercise) return null

	// Если пользователь не написал перевод
	if (!exercise.userTranslate && exercisesBlock.analysis.status === ExercisesContextType.AnalysisStatus.visible) {
		// то вывести список правильных ответов
		return <CorrectTranslationsList correctTranslations={exercisesBlock.analysis.correctTranslations} />
	}

	// В противном случае проанализировать перевод
	return <AnalysisForTranslation />
}

export default Analysis
