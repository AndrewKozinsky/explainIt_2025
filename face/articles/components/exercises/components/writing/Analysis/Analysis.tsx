import { useContext } from 'react'
import { ExercisesContext } from '../../../logic/exercisesContext'
import { ExercisesContextType } from '../../../logic/exercisesContextTypes'
import { exercisesLogic } from '../../../logic/exercisesLogic'
import AnalysisForTranslation from '../AnalysisForTranslation/AnalysisForTranslation'
import CorrectTranslationsList from '../CorrectTranslationsList/CorrectTranslationsList'

/** Анализ перевода введённого пользователем либо показ правильных вариантов */
function Analysis() {
	const { exercisesBlock } = useContext(ExercisesContext)

	const exercise = exercisesLogic.useGetCurrentExercise()
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
