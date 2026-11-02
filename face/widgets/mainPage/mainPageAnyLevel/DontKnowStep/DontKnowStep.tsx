import { useTranslations } from 'next-intl'
import { filesUrls } from '@/shared/utils/filesUrls'
import StepCard from '../StepCard/StepCard'
import StepCardText from '../StepCard/StepCardText'
import StepImage from '../StepImage/StepImage'
import ThoughtBox from '../ThoughtBox/ThoughtBox'
import './DontKnowStep.scss'

/** Шаг 1: парень знает, что хочет сказать, но не знает как, и отвечает как может */
function DontKnowStep() {
	const t = useTranslations('mainPageAnyLevel.dontKnow')

	return (
		<StepCard number='01' title={t('title')}>
			<div className='any-level-dont-know-step'>
				<StepImage
					imagePath={filesUrls.mainPage.anyLevel.guyThinking}
					extraClass='any-level-dont-know-step__guy'
				/>
				{/* Мысли парня: при показанной иллюстрации стоят вплотную к нему */}
				<StepCardText extraClass='any-level-dont-know-step__main'>
					<ThoughtBox
						label={t('thoughtLabel')}
						text={t('thought')}
						tailExtraClass='any-level-dont-know-step__thought-tail'
					/>
					<ThoughtBox
						label={t('doubtLabel')}
						text={t('doubt')}
						tailExtraClass='any-level-dont-know-step__thought-tail'
					/>
					<p className='any-level-dont-know-step__call'>{t('call')}</p>
					<div className='any-level-dont-know-step__answer'>
						<p className='any-level-dont-know-step__answer-label'>{t('answerLabel')}</p>
						<p className='any-level-dont-know-step__answer-text'>{t('answer')}</p>
						{/* Только картинка кнопки: на главной странице она ничего не делает */}
						<span className='any-level-dont-know-step__check' aria-hidden='true'>
							{t('check')}
						</span>
					</div>
				</StepCardText>
				<StepImage
					imagePath={filesUrls.mainPage.anyLevel.baristaListening}
					extraClass='any-level-dont-know-step__barista'
				/>
			</div>
		</StepCard>
	)
}

export default DontKnowStep
