import { useContext, useState } from 'react'
import Switcher from '../../../../../../ui/Switcher/Switcher'
import ArticleBuilder from '../../../../../ArticleBuilder/ArticleBuilder'
import { ExercisesContext } from '../../../logic/exercisesContext'
import { ExercisesContextType } from '../../../logic/exercisesStoreTypes'
import CorrectTranslationsList from '../CorrectTranslationsList/CorrectTranslationsList'

/** Разбор перевода данного пользователем */
function AnalysisForTranslation() {
	const { analysis } = useContext(ExercisesContext).exercisesBlock

	const [viewType, setViewType] = useState<'analysis' | 'correctVariants'>('analysis')

	if (analysis.status !== ExercisesContextType.AnalysisStatus.visible) {
		return null
	}

	return (
		<div>
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
			{viewType === 'correctVariants' && (
				<CorrectTranslationsList correctTranslations={analysis.correctTranslations} />
			)}
			{viewType === 'analysis' && analysis.translateAnalysis && (
				<ArticleBuilder articleContent={analysis.translateAnalysis} />
			)}
		</div>
	)
}

export default AnalysisForTranslation
