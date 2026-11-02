import { useTranslations } from 'next-intl'
import SpeechBubble from '@/shared/ui/SpeechBubble/SpeechBubble'
import StepCard from '../StepCard/StepCard'
import StepCardText from '../StepCard/StepCardText'
import StepImage from '../StepImage/StepImage'
import './SayRightStep.scss'

/** Шаг 3: парень говорит правильно, девушка его понимает, и история идёт дальше */
function SayRightStep() {
	const t = useTranslations('mainPageAnyLevel')

	return (
		<StepCard number='03' title={t('sayRight.title')}>
			<div className='any-level-say-right-step'>
				<StepImage
					imagePath='/mainPage/anyLevel/any-level-guy-cafe.webp'
					extraClass='any-level-say-right-step__guy'
				/>
				<StepCardText extraClass='any-level-say-right-step__main'>
					<SpeechBubble
						size='middle'
						theme='dark'
						tipDirection='left'
						extraClass='any-level-say-right-step__user-line'
					>
						<p className='any-level-say-right-step__line' lang={t('learnedLang')}>
							{t('sayRight.userLine')}
						</p>
					</SpeechBubble>
					<p className='any-level-say-right-step__action'>{t('sayRight.action')}</p>
					<SpeechBubble
						size='middle'
						theme='white'
						tipDirection='right'
						extraClass='any-level-say-right-step__npc-line'
					>
						<p className='any-level-say-right-step__line' lang={t('learnedLang')}>
							{t('sayRight.npcLine')}
						</p>
					</SpeechBubble>
					<p className='any-level-say-right-step__text'>{t('sayRight.text')}</p>
				</StepCardText>
				<StepImage
					imagePath='/mainPage/anyLevel/any-level-barista-cafe.webp'
					extraClass='any-level-say-right-step__barista'
				/>
			</div>
		</StepCard>
	)
}

export default SayRightStep
