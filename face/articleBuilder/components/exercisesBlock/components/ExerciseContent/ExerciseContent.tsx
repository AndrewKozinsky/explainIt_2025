// import { ExercisesManagerTypes } from '../../logic/exercisesManagerTypes'
// import { useExercisesModalStore } from '../../store/store'
// import BottomButton from '../common/BottomButton/BottomButton'
// import { useIsShownResultInOralExercise } from '../common/commonFn'
// import Dictionary from '../common/Dictionary/Dictionary'
// import Analysis from '../writing/Analysis/Analysis'
// import EngTranslateInput from '../writing/EngTranslateInput/EngTranslateInput'
// import RightEngTranslate from '../oral/RightEngTranslate/RightEngTranslate'
import RusExercise from '../common/RusExercise/RusExercise'
// import LoadingOrErrorAnalysis from '../writing/LoadingOrErrorAnalysis/LoadingOrErrorAnalysis'
import { ExercisesStoreType } from '../../../../../_pages/courseArticlePage/ExercisesStoreWrapper/exercisesStore/exercisesStoreTypes'
import exercisesLogic from '../../logic/exercisesLogic'
import './ExerciseContent.scss'

type ExerciseContentProps = {
	exercisesBlockId: number
}

/** Часть блока прохождения упражнений с самим упражнением. */
function ExerciseContent(props: ExerciseContentProps) {
	const { exercisesBlockId } = props

	const exercisesBlock = exercisesLogic.useGetExercisesBlock(exercisesBlockId)
	if (!exercisesBlock) return null

	return exercisesBlock.currentExerciseType === ExercisesStoreType.ExerciseType.write ? (
		<WritingExerciseContent exercisesBlockId={exercisesBlockId} />
	) : (
		<OralExerciseContent exercisesBlockId={exercisesBlockId} />
	)
}

export default ExerciseContent

/** Письменное упражнение. */
function WritingExerciseContent(props: ExerciseContentProps) {
	const { exercisesBlockId } = props

	const exercise = exercisesLogic.useGetCurrentSentence(exercisesBlockId)

	// const { analysis } = useExercisesModalStore().store

	return (
		<div className='exercise-content'>
			<div className='exercise-content__top'>
				<RusExercise exercisesBlockId={exercisesBlockId} />
				{/*<EngTranslateInput />*/}
			</div>
			{/*{analysis.status === ExercisesManagerTypes.AnalysisStatus.hidden && <Dictionary />}*/}
			{/*{analysis.status === ExercisesManagerTypes.AnalysisStatus.loading && (
				<LoadingOrErrorAnalysis type='loading' />
			)}*/}
			{/*{analysis.status === ExercisesManagerTypes.AnalysisStatus.error && <LoadingOrErrorAnalysis type='error' />}*/}
			{/*{analysis.status === ExercisesManagerTypes.AnalysisStatus.visible && <Analysis />}*/}
			{/*<BottomButton />*/}
		</div>
	)
}

/** Голосовое упражнение. */
function OralExerciseContent(props: ExerciseContentProps) {
	const { exercisesBlockId } = props

	const exercise = exercisesLogic.useGetCurrentSentence(exercisesBlockId)
	// const isShownResultInOralExercise = useIsShownResultInOralExercise()

	return (
		<div className='exercise-content'>
			<div className='exercise-content__top'>
				<RusExercise exercisesBlockId={exercisesBlockId} />
				{/*{isShownResultInOralExercise && <RightEngTranslate />}*/}
			</div>
			{/*{!isShownResultInOralExercise && <Dictionary />}*/}
			{/*<BottomButton />*/}
		</div>
	)
}
