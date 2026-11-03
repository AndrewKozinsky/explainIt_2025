import { useTranslations } from 'next-intl'
import SpeechBubble from '@/shared/ui/SpeechBubble/SpeechBubble'
import './FeatureSpeechLevels.scss'

/** Одна и та же реплика персонажа на начальном уровне и без ограничений */
function FeatureSpeechLevels() {
	const t = useTranslations('mainPageFeatures')

	const levels = [
		{ label: t('speechLevel.beginnerLabel'), line: t('speechLevel.beginnerLine') },
		{ label: t('speechLevel.freeLabel'), line: t('speechLevel.freeLine') },
	]

	return (
		<div className='feature-speech-levels'>
			{levels.map((level) => (
				<SpeechBubble size='small' theme='dark' tipDirection='left' key={level.label}>
					<p className='feature-speech-levels__label'>{level.label}</p>
					<p className='feature-speech-levels__line' lang={t('learnedLang')}>
						{level.line}
					</p>
				</SpeechBubble>
			))}
		</div>
	)
}

export default FeatureSpeechLevels
