import './MainPageTop.scss'
import Link from 'next/link'
import { filesUrls } from 'utils/filesUrls'
import MainPageGallery from '_pages/main/MainPageGallery/MainPageGallery'
import { pageUrls } from 'сonsts/pageUrls'

function MainPageTop() {
	return (
		<div className='main-page-top'>
			<h1 className='main-page-top__header' data-text='Читайте книги и смотрите фильмы в оригинале'>
				Совершенствуйте язык через{' '}
				<span className='main-page-top__header-block'>
					<img
						src={filesUrls.mainPage.sherlockHolmes}
						className='main-page-top__header-icon'
						alt='CherlockIcon'
					/>{' '}
					<span className='main-page-top__header-fancy'>книги</span>
				</span>{' '}
				<span className='main-page-top__header-block'>
					и <img src={filesUrls.mainPage.ironMan} className='main-page-top__header-icon' alt='CherlockIcon' />
					<span className='main-page-top__header-fancy'>фильмы</span>
				</span>
			</h1>
			<p className='main-page-top__subheader'>
				Перевод, произношение и&nbsp;примеры встроены прямо в&nbsp;контент
			</p>
			<div className='main-page-top__buttons'>
				{/*<button className='main-page-top__button main-page-top__button--white'>
					<img src={publicFolderFilesUrls.mainPage.roundPlay} alt='arrow icon' />
					Демонстрация (1 мин.)
				</button>*/}
				<Link href={pageUrls.books.book('p1').chapter(1).reading.path}>
					<button className='main-page-top__button main-page-top__button--accent'>
						<img src={filesUrls.mainPage.roundArrow} alt='arrow icon' />
						Попробовать
					</button>
				</Link>
			</div>
			<MainPageGallery />
		</div>
	)
}

export default MainPageTop
