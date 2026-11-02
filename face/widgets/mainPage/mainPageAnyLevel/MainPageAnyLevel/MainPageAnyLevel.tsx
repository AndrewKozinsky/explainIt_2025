import { useTranslations } from 'next-intl'
import { KeyboardIcon } from '@/shared/ui/icons/mainPage/KeyboardIcon'
import { SoundWaveIcon } from '@/shared/ui/icons/mainPage/SoundWaveIcon'
import MainPageNote from '../../MainPageNote/MainPageNote'
import MainPageSection from '../../MainPageSection/MainPageSection'

/** Блок главной страницы: можно отвечать как получается, а помощник покажет, как сказать правильно */
function MainPageAnyLevel() {
	const t = useTranslations('mainPageAnyLevel')

	return (
		<MainPageSection eyebrow={t('eyebrow')} header={t('header')} text={t('text')}>
			{/* Здесь будут три блока с примером: не знаете, как сказать, получите подсказку, скажите правильно */}
			<MainPageNote>
				{t.rich('note', {
					keyboard: () => <KeyboardIcon extraClass='main-page-note__icon' />,
					wave: () => <SoundWaveIcon extraClass='main-page-note__icon' />,
				})}
			</MainPageNote>
		</MainPageSection>
	)
}

export default MainPageAnyLevel
