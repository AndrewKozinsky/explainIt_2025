import { useLocale, useTranslations } from 'next-intl'
import { filesUrls } from '@/shared/utils/filesUrls'
import MainPageSection from '../../MainPageSection/MainPageSection'
import DemoVideoPlayer from '../DemoVideoPlayer/DemoVideoPlayer'

/** Блок главной страницы: видео с примером диалога на языке интерфейса */
function MainPageDemoVideo() {
	const t = useTranslations('mainPageDemoVideo')
	const locale = useLocale()
	const { videoUrl, posterUrl } = filesUrls.mainPage.demoVideo[locale]

	return (
		<MainPageSection eyebrow={t('eyebrow')} header={t('header')} text={t('text')}>
			<DemoVideoPlayer
				videoUrl={videoUrl}
				posterUrl={posterUrl}
				videoLabel={t('videoLabel')}
				playLabel={t('playLabel')}
			/>
		</MainPageSection>
	)
}

export default MainPageDemoVideo
