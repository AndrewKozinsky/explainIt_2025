'use client'

import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { ActionButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/ActionButtonIcon'
import { pageUrls } from '@/shared/utils/pageUrls'
import BannerFigure from '../BannerFigure/BannerFigure'
import BannerLanguage from '../BannerLanguage/BannerLanguage'
import { useBannerLanguage } from './fn/useBannerLanguage'
import './MainPageBanner.scss'

/** Главный баннер главной страницы: приглашение в диалоги с ИИ */
function MainPageBanner() {
	const { languageCode, nextLanguageCode } = useBannerLanguage()

	return (
		<section className='main-page-banner'>
			<div className='main-page-banner__card'>
				<div className='main-page-banner__content'>
					<p className='main-page-banner__eyebrow'>Иностранный язык через диалог с ИИ</p>
					<h2 className='main-page-banner__header'>
						Проживайте истории на <BannerLanguage languageCode={languageCode} />, попутно осваивая его
					</h2>
					<p className='main-page-banner__text'>
						Говорите и действуйте так, как хочется вам. Персонажи реагируют, события развиваются. Всё как в
						нашей жизни. А вам интересно, что будет дальше.
					</p>
					<div className='main-page-banner__action'>
						<Button
							theme='accent'
							size='big'
							href={pageUrls.aiDialogues.path}
							icon={<ActionButtonIcon />}
							extraClass='main-page-banner__button'
						>
							Выбрать сцену
						</Button>
						<p className='main-page-banner__note'>Полностью бесплатно.</p>
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
