import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import './MainPageTop.scss'

function MainPageTop() {
	return (
		<div className='main-page-top'>
			<h1 className='main-page-top__header' data-text='Читайте книги и смотрите фильмы в оригинале'>
				Читайте книги и&nbsp;смотрите фильмы в&nbsp;оригинале
			</h1>
			<p className='main-page-top__subheader'>понимая каждую фразу</p>
			<video
				src={publicFolderFilesUrls.mainPage.headVideo}
				className='main-page-top__video'
				autoPlay
				muted
				loop
				playsInline
				poster={publicFolderFilesUrls.mainPage.headVideoPoster}
			/>
		</div>
	)
}

export default MainPageTop
