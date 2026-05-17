import Link from 'next/link'
import { filesUrls } from 'utils/filesUrls'
import { pageUrls } from 'сonsts/pageUrls'
import './MainPageTop.scss'

function MainPageTop() {
	return (
		<div className='main-page-top'>
			<h1 className='main-page-top__header'>Читайте и&nbsp;смотрите в&nbsp;оригинале без&nbsp;страха</h1>
			<p className='main-page-top__subheader'>Перевод одним нажатием</p>
			<div className='main-page-top__buttons'>
				{/*<button className='main-page-top__button main-page-top__button--white'>
					<img src={publicFolderFilesUrls.mainPage.roundPlay} alt='arrow icon' />
					Демонстрация (1 мин.)
				</button>*/}
				<Link href={pageUrls.books.book('p1').chapter(1).reading.path}>
					<button className='main-page-top__button main-page-top__button--accent'>
						<img src={filesUrls.mainPage.roundArrow} alt='arrow icon' />
						Начать без регистрации
					</button>
				</Link>
			</div>
		</div>
	)
}

export default MainPageTop
