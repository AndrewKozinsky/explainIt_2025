import { useTranslations } from 'next-intl'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import { CircleArrowRightIcon } from '@/shared/ui/icons/mainPage/CircleArrowRightIcon'
import { pageUrls } from '@/shared/utils/pageUrls'
import MainPageHeader from '../MainPageHeader/MainPageHeader'
import './MainPageCallToAction.scss'

/** Блок главной страницы: призыв выбрать сюжет и начать диалог */
function MainPageCallToAction() {
	const t = useTranslations('mainPageCallToAction')

	return (
		<section className='call-to-action'>
			<div className='call-to-action__card'>
				<div className='call-to-action__content'>
					<MainPageHeader text={t('header')} extraClass='call-to-action__header' />
					<p className='call-to-action__text'>{t('text')}</p>
				</div>
				<BaseButton theme='accent' href={pageUrls.aiDialogues.path} extraClass='call-to-action__link'>
					<span className='call-to-action__link-texts'>
						<span className='call-to-action__link-text'>{t('button')}</span>
						<span className='call-to-action__link-note'>{t('note')}</span>
					</span>
					<CircleArrowRightIcon extraClass='call-to-action__link-icon' />
				</BaseButton>
			</div>
		</section>
	)
}

export default MainPageCallToAction
