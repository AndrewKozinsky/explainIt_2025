import './MainPageTop.scss'
import Link from 'next/link'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import MainPageGallery from '_pages/main/MainPageGallery/MainPageGallery'
import { pageUrls } from 'сonsts/pageUrls'

function MainPageTop() {
	return (
		<div className='main-page-top'>
			<h1 className='main-page-top__header' data-text='Читайте книги и смотрите фильмы в оригинале'>
				Совершенствуйте язык через{' '}
				<span className='main-page-top__header-block'>
					<img
						src={publicFolderFilesUrls.mainPage.sherlockHolmes}
						className='main-page-top__header-icon'
						alt='CherlockIcon'
					/>{' '}
					<span className='main-page-top__header-fancy'>книги</span>
				</span>{' '}
				<span className='main-page-top__header-block'>
					и{' '}
					<img
						src={publicFolderFilesUrls.mainPage.ironMan}
						className='main-page-top__header-icon'
						alt='CherlockIcon'
					/>
					<span className='main-page-top__header-fancy'>фильмы</span>
				</span>
			</h1>
			<p className='main-page-top__subheader'>
				Перевод, произношение и&nbsp;примеры встроены прямо в&nbsp;контент
			</p>
			<div className='main-page-top__buttons'>
				<button className='main-page-top__button main-page-top__button--white'>
					<img src={publicFolderFilesUrls.mainPage.roundPlay} alt='arrow icon' />
					Демонстрация (1 мин.)
				</button>
				<Link href={pageUrls.books.book('p1').path}>
					<button className='main-page-top__button main-page-top__button--accent'>
						<img src={publicFolderFilesUrls.mainPage.roundArrow} alt='arrow icon' />
						Начать
					</button>
				</Link>
			</div>
			<MainPageGallery />
		</div>
	)
}

export default MainPageTop
