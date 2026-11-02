import { useTranslations } from 'next-intl'
import { KeyboardIcon } from '@/shared/ui/icons/mainPage/KeyboardIcon'
import { SoundWaveIcon } from '@/shared/ui/icons/mainPage/SoundWaveIcon'
import MainPageNote from '../../MainPageNote/MainPageNote'
import MainPageSection from '../../MainPageSection/MainPageSection'
import DontKnowStep from '../DontKnowStep/DontKnowStep'
import HintStep from '../HintStep/HintStep'
import SayRightStep from '../SayRightStep/SayRightStep'
import './MainPageAnyLevel.scss'

/** Блок главной страницы: можно отвечать как получается, а помощник покажет, как сказать правильно */
function MainPageAnyLevel() {
	const t = useTranslations('mainPageAnyLevel')

	return (
		<MainPageSection eyebrow={t('eyebrow')} header={t('header')} text={t('text')}>
			<ol className='any-level-steps'>
				<DontKnowStep />
				<HintStep />
				<SayRightStep />
			</ol>
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
