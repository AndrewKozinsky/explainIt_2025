import { useContext, useState } from 'react'
import Switcher from '@/ui//Switcher/Switcher'
import ArticleBuilder from '../../../../../ArticleBuilder/ArticleBuilder'
import Transcription from '../../../../Transcription/Transcription'
import { ExercisesContext } from '../../../logic/exercisesContext'
import { ExercisesContextType } from '../../../logic/exercisesContextTypes'
import { exercisesLogic } from '../../../logic/exercisesLogic'
import CorrectTranslationsList from '../CorrectTranslationsList/CorrectTranslationsList'
import { useGetEngTranscription } from '../CorrectTranslationsList/fn/componentHandlers'
import './AnalysisForTranslation.scss'

/** Разбор перевода данного пользователем */
function AnalysisForTranslation() {
	const { analysis } = useContext(ExercisesContext).exercisesBlock

	const exercise = exercisesLogic.useGetCurrentExercise()
	const [viewType, setViewType] = useState<'analysis' | 'correctVariants'>('analysis')

	if (!exercise || analysis.status !== ExercisesContextType.AnalysisStatus.visible) {
		return null
	}

	return (
		<div className='exercises-analysis-for-translation' data-testid='exercise-analysis-block'>
			<Switcher
				orientation='horizontal'
				items={[
					{
						text: 'Разбор',
						isCurrent: viewType === 'analysis',
						onClick: () => {
							setViewType('analysis')
						},
					},
					{
						text: 'Варианты перевода',
						isCurrent: viewType === 'correctVariants',
						onClick: () => {
							setViewType('correctVariants')
						},
					},
				]}
			/>
			<div className='exercises-analysis-for-translation__content'>
				{viewType === 'correctVariants' && (
					<CorrectTranslationsList correctTranslations={analysis.correctTranslations} />
				)}
				{viewType === 'analysis' && analysis.translateAnalysis && (
					<>
						<TranscriptionBlock engSentence={exercise.userTranslate} />
						<ArticleBuilder articleContent={analysis.translateAnalysis} />
					</>
				)}
			</div>
		</div>
	)
}

export default AnalysisForTranslation

type TranscriptionBlockProps = {
	engSentence: string
}

function TranscriptionBlock(props: TranscriptionBlockProps) {
	const { engSentence } = props

	const engTranscription = useGetEngTranscription(engSentence)
	if (!engTranscription) {
		return null
	}

	return (
		<div className='exercises-analysis-for-translation__translation'>
			<Transcription engSentence={engTranscription.sentence} />
		</div>
	)
}
