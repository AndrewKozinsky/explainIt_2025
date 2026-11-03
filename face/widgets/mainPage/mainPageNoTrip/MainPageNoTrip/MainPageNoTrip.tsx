import { useTranslations } from 'next-intl'
import MainPageEyebrow from '../../MainPageEyebrow/MainPageEyebrow'
import AvailableLanguages from '../AvailableLanguages/AvailableLanguages'
import './MainPageNoTrip.scss'

/** Блок главной страницы: практика языка как в другой стране, только без поездки */
function MainPageNoTrip() {
	const t = useTranslations('mainPageNoTrip')

	return (
		<section className='no-trip'>
			<div className='no-trip__content'>
				<div className='no-trip__top'>
					<MainPageEyebrow text={t('eyebrow')} />
					<h2 className='no-trip__statement'>{t('statement')}</h2>
				</div>
				<AvailableLanguages />
			</div>
		</section>
	)
}

export default MainPageNoTrip
