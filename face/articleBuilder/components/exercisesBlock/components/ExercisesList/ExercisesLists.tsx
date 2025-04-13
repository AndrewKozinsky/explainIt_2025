import { useExercisesStore } from '../../../../../_pages/courseArticlePage/ExercisesStoreWrapper/exercisesStore/exercisesStore'
import { ExercisesStoreType } from '../../../../../_pages/courseArticlePage/ExercisesStoreWrapper/exercisesStore/exercisesStoreTypes'
import Switcher, { SwitcherItem } from '../../../../../ui/Switcher/Switcher'
import exercisesLogic from '../../logic/exercisesLogic'
import s from './ExercisesLists.module.scss'

type ExercisesListsProps = {
	exercisesBlockId: number
}

/** Списки упражнений для прохождения. */
function ExercisesLists(props: ExercisesListsProps) {
	const { exercisesBlockId } = props

	const exercisesBlock = exercisesLogic.useGetExercisesBlock(exercisesBlockId)
	if (!exercisesBlock) return null

	return (
		<div className={s.generalWrapper}>
			<SentencesList
				exercisesBlockId={exercisesBlockId}
				exercises={exercisesBlock.exercises}
				currentSentenceId={exercisesBlock.currentSentenceId}
			/>
		</div>
	)
}

export default ExercisesLists

type ExercisesListProps = {
	exercisesBlockId: number
	exercises: ExercisesStoreType.Exercise[]
	currentSentenceId: number
}

/** Список предложений для перевода. */
function SentencesList(props: ExercisesListProps) {
	const { exercisesBlockId, exercises, currentSentenceId } = props

	const items: SwitcherItem[] = exercises.map((exercise) => {
		return {
			text: exercise.rusSentence,
			isCurrent: exercise.id === currentSentenceId,
			onClick: () => useExercisesStore.getState().switchToSentence(exercisesBlockId, exercise.id),
		}
	})

	return (
		<div className={s.partWrapper}>
			<Switcher items={items} orientation='vertical' />
		</div>
	)
}
