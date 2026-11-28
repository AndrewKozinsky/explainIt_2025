import { useTranslations } from 'next-intl'
import ContentHeaderWithChildren from '@/shared/ui/content/ContentHeaderWithChildren/ContentHeaderWithChildren'
import ContentText from '@/shared/ui/content/ContentText/ContentText'
import type { ScenarioCardConfig } from '../../fn/getScenarioGroupsConfig'

type Props = Pick<ScenarioCardConfig, 'trainedSkills'>

export default function ScenarioTrainedSkills({ trainedSkills }: Props) {
	const t = useTranslations('aiDialogueScenariosList.startModal')

	if (trainedSkills.trim() === '') {
		return null
	}

	return (
		<ContentHeaderWithChildren title={t('trainedSkills')} hTag={5}>
			<ContentText size='small'>{trainedSkills}</ContentText>
		</ContentHeaderWithChildren>
	)
}
