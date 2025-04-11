import { ExercisesManagerTypes } from '../../logic/exercisesManagerTypes'
import { useExercisesModalStore } from '../../store/store'
import BottomButton from '../common/BottomButton/BottomButton'
import { useIsShownResultInOralExercise } from '../common/commonFn'
import Dictionary from '../common/Dictionary/Dictionary'
import Analysis from '../writing/Analysis/Analysis'
import EngTranslateInput from '../writing/EngTranslateInput/EngTranslateInput'
import RightEngTranslate from '../oral/RightEngTranslate/RightEngTranslate'
import RusExercise from '../common/RusExercise/RusExercise'
import LoadingOrErrorAnalysis from '../writing/LoadingOrErrorAnalysis/LoadingOrErrorAnalysis'
import './ExerciseContent.scss'

/** Часть модального окна прохождения упражнений с самим упражнением. */
function ExerciseContent() {
	const exercise = useExercisesModalStore().store.currentExercise

	return exercise.type === ExercisesManagerTypes.ExerciseType.write ? (
		<WritingExerciseContent />
	) : (
		<OralExerciseContent />
	)
}

export default ExerciseContent

/** Письменное упражнение. */
function WritingExerciseContent() {
	const { analysis } = useExercisesModalStore().store

	return (
		<div className='exercise-content'>
			<div className='exercise-content__top'>
				<RusExercise />
				<EngTranslateInput />
			</div>
			{analysis.status === ExercisesManagerTypes.AnalysisStatus.hidden && <Dictionary />}
			{analysis.status === ExercisesManagerTypes.AnalysisStatus.loading && (
				<LoadingOrErrorAnalysis type='loading' />
			)}
			{analysis.status === ExercisesManagerTypes.AnalysisStatus.error && <LoadingOrErrorAnalysis type='error' />}
			{analysis.status === ExercisesManagerTypes.AnalysisStatus.visible && <Analysis />}
			<BottomButton />
		</div>
	)
}

/** Голосовое упражнение. */
function OralExerciseContent() {
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
