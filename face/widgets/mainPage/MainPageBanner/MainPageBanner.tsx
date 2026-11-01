import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { ActionButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/ActionButtonIcon'
import { pageUrls } from '@/shared/utils/pageUrls'
import './MainPageBanner.scss'

/** Главный баннер главной страницы: приглашение в диалоги с ИИ */
function MainPageBanner() {
	return (
		<section className='main-page-banner'>
			<div className='main-page-banner__card'>
				<div className='main-page-banner__content'>
					<p className='main-page-banner__eyebrow'>Иностранный язык через диалог с ИИ</p>
					<h2 className='main-page-banner__header'>Проживайте истории на английском, попутно осваивая его</h2>
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
				<figure className='main-page-banner__figure'>
					<img
						className='main-page-banner__image'
						src='/mainPage/banner/cafe-1428.webp'
						width={1428}
						height={888}
						alt='Молодой человек с кофе разговаривает с бариста в уютном кафе'
					/>
					<figcaption className='main-page-banner__caption'>
						<p className='main-page-banner__caption-title'>Кафе в Лондоне · вечер</p>
						<p className='main-page-banner__caption-text'>Ваш английский пригодится уже в первой сцене.</p>
					</figcaption>
				</figure>
			</div>
		</section>
	)
}

export default MainPageBanner
