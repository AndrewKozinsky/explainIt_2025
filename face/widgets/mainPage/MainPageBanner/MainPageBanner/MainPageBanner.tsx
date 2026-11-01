'use client'

import { useTranslations } from 'next-intl'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { ActionButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/ActionButtonIcon'
import { pageUrls } from '@/shared/utils/pageUrls'
import BannerFigure from '../BannerFigure/BannerFigure'
import BannerLanguage from '../BannerLanguage/BannerLanguage'
import { useBannerLanguage } from './fn/useBannerLanguage'
import './MainPageBanner.scss'

/** Главный баннер главной страницы: приглашение в диалоги с ИИ */
function MainPageBanner() {
	const { languageCodes, languageCode, nextLanguageCode } = useBannerLanguage()
	const t = useTranslations('mainPageBanner')

	return (
		<section className='main-page-banner'>
			<div className='main-page-banner__card'>
				<div className='main-page-banner__content'>
					<p className='main-page-banner__eyebrow'>{t('eyebrow')}</p>
					<h2 className='main-page-banner__header'>
						<span className='main-page-banner__header-text'>
							{t.rich('header', {
								// Название языка стоит в своём месте фразы для каждой локали
								language: () => (
									<BannerLanguage languageCode={languageCode} languageCodes={languageCodes} />
								),
							})}
						</span>
						{/* Невидимые копии заголовка с каждым языком: заголовок занимает высоту самой высокой,
						поэтому баннер не меняет высоту при смене языка */}
						{languageCodes.map((code) => (
							<span className='main-page-banner__header-sizer' aria-hidden='true' key={code}>
								{t.rich('header', {
									language: () => (
										<span className='main-page-banner__header-sizer-language'>
											{t(`headerLanguages.${code}`)}
										</span>
									),
								})}
							</span>
						))}
					</h2>
					<p className='main-page-banner__text'>{t('text')}</p>
					<div className='main-page-banner__action'>
						<Button
							theme='accent'
							size='big'
							href={pageUrls.aiDialogues.path}
							icon={<ActionButtonIcon />}
							extraClass='main-page-banner__button'
						>
							{t('button')}
						</Button>
						<p className='main-page-banner__note'>{t('note')}</p>
					</div>
				</div>
				<BannerFigure
					languageCode={languageCode}
					nextLanguageCode={nextLanguageCode}
					extraClass='main-page-banner__figure'
				/>
			</div>
		</section>
	)
}

export default MainPageBanner
