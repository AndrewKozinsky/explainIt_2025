import { useContext } from 'react'
import BottomButton from '../common/BottomButton/BottomButton'
import { useIsShownResultInOralExercise } from '../common/commonFn'
import Dictionary from '../common/Dictionary/Dictionary'
import Analysis from '../writing/Analysis/Analysis'
import EngTranslateInput from '../writing/EngTranslateInput/EngTranslateInput'
import RightEngTranslate from '../oral/RightEngTranslate/RightEngTranslate'
import RusExercise from '../common/RusExercise/RusExercise'
import LoadingOrErrorAnalysis from '../writing/LoadingOrErrorAnalysis/LoadingOrErrorAnalysis'
import { ExercisesContext } from '../../exercisesContext/exercisesContext'
import { ExercisesContextType } from '../../exercisesContext/exercisesStoreTypes'
import './ExerciseContent.scss'

/** Часть блока прохождения упражнений с самим упражнением. */
function ExerciseContent() {
	const { exercisesBlock } = useContext(ExercisesContext)

	return exercisesBlock.currentExerciseType === ExercisesContextType.ExerciseType.write ? (
		<WritingExerciseContent />
	) : (
		<OralExerciseContent />
	)
}

export default ExerciseContent

/** Письменное упражнение. */
function WritingExerciseContent() {
	const { exercisesBlock } = useContext(ExercisesContext)

	return (
		<div className='exercise-content'>
			<div className='exercise-content__top'>
				<RusExercise />
				<EngTranslateInput />
			</div>
			{exercisesBlock.analysis.status === ExercisesContextType.AnalysisStatus.hidden && <Dictionary />}
			{exercisesBlock.analysis.status === ExercisesContextType.AnalysisStatus.loading && (
				<LoadingOrErrorAnalysis type='loading' />
			)}
			{exercisesBlock.analysis.status === ExercisesContextType.AnalysisStatus.error && (
				<LoadingOrErrorAnalysis type='error' />
			)}
			{exercisesBlock.analysis.status === ExercisesContextType.AnalysisStatus.visible && <Analysis />}
			<BottomButton />
		</div>
	)
}

/** Голосовое упражнение. */
function OralExerciseContent() {
	// const exercise = exercisesLogic.useGetCurrentSentence(exercisesBlockId)
	const isShownResultInOralExercise = useIsShownResultInOralExercise()

	return (
		<div className='exercise-content'>
			<div className='exercise-content__top'>
				<RusExercise />
				{isShownResultInOralExercise && <RightEngTranslate />}
			</div>
			{!isShownResultInOralExercise && <Dictionary />}
			<BottomButton />
		</div>
	)
}
