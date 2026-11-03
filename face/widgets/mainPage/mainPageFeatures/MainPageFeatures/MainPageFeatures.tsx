import { useTranslations } from 'next-intl'
import MainPageSection from '../../MainPageSection/MainPageSection'
import FeatureCard from '../FeatureCard/FeatureCard'
import FeatureContextWord from '../FeatureContextWord/FeatureContextWord'
import FeatureEmotions from '../FeatureEmotions/FeatureEmotions'
import FeaturePlots from '../FeaturePlots/FeaturePlots'
import FeatureSpeechLevels from '../FeatureSpeechLevels/FeatureSpeechLevels'
import './MainPageFeatures.scss'

/** Блок главной страницы: шесть дополнительных функций диалогов */
function MainPageFeatures() {
	const t = useTranslations('mainPageFeatures')

	return (
		<MainPageSection eyebrow={t('eyebrow')} header={t('header')} text={t('text')}>
			{/* Карточки разложены по колонкам, как в макете. На узком разделе колонки исчезают и карточки идут подряд */}
			<div className='features-list'>
				<div className='features-list__column'>
					<FeatureCard number='1' title={t('hero.title')} text={t('hero.text')} />
					<FeatureCard number='2' title={t('emotions.title')} text={t('emotions.text')}>
						<FeatureEmotions />
					</FeatureCard>
				</div>
				<div className='features-list__column'>
					<FeatureCard number='3' title={t('speechLevel.title')} text={t('speechLevel.text')}>
						<FeatureSpeechLevels />
					</FeatureCard>
					<FeatureCard number='4' title={t('translation.title')} text={t('translation.text')} />
				</div>
				<div className='features-list__column'>
					<FeatureCard number='5' title={t('dictionary.title')} text={t('dictionary.text')}>
						<FeatureContextWord />
					</FeatureCard>
					<FeatureCard number='6' title={t('plots.title')} text={t('plots.text')}>
						<FeaturePlots />
					</FeatureCard>
				</div>
			</div>
		</MainPageSection>
	)
}

export default MainPageFeatures
