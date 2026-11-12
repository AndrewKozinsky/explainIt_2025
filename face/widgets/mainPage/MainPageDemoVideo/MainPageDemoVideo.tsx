import { useLocale, useTranslations } from 'next-intl'
import { filesUrls } from '@/shared/utils/filesUrls'
import MainPageSection from '../MainPageSection/MainPageSection'
import './MainPageDemoVideo.scss'

/** Блок главной страницы: видео с примером диалога на языке интерфейса */
function MainPageDemoVideo() {
	const t = useTranslations('mainPageDemoVideo')
	const locale = useLocale()
	const { videoUrl, posterUrl } = filesUrls.mainPage.demoVideo[locale]

	// preload="none": видео около 9 МБ скачивается только после нажатия на воспроизведение
	return (
		<MainPageSection eyebrow={t('eyebrow')} header={t('header')} text={t('text')}>
			<div className='main-page-demo-video'>
				<video
					className='main-page-demo-video__player'
					src={videoUrl}
					poster={posterUrl}
					width={1500}
					height={834}
					aria-label={t('videoLabel')}
					controls
					playsInline
					preload='none'
				/>
			</div>
		</MainPageSection>
	)
}

export default MainPageDemoVideo
