import React from 'react'
import Paragraph from 'ui/Paragraph/Paragraph'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import FaqOnMainPage from '_pages/main/mainPage/FaqOnMainPage/FaqOnMainPage'
import MainPageTop from '_pages/main/mainPage/MainPageTop/MainPageTop'
import MainPageMediaCircles from '_pages/main/mainPage/media/MainPageMediaCircles/MainPageMediaCircles'
import MainPageMediaContent from '_pages/main/mainPage/media/MainPageMediaContent/MainPageMediaContent'
import MainPageMediaCovers from '_pages/main/mainPage/media/MainPageMediaCovers/MainPageMediaCovers'
import { MainPageMediaLayout } from '_pages/main/mainPage/media/MainPageMediaLayout/MainPageMediaLayout'
import MainPageMediaParagraph from '_pages/main/mainPage/media/MainPageMediaParagraph/MainPageMediaParagraph'
import GoToReadingButton from '../GoToReadingButton/GoToReadingButton'
import MainPageHContentBlock from '../MainPageContentBlock/MainPageContentBlock'
import MainPageFeatures from '../MainPageFeatures/MainPageFeatures'
import './MainPage.scss'

function MainPage() {
	return (
		<PageWrapper top bottom>
			<main className='main-page'>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				<MainPageTop />
				<MainPageHContentBlock num='01' header='Почему так учить язык проще'>
					<MainPageFeatures />
				</MainPageHContentBlock>
				<MainPageHContentBlock num='02' header='Читайте любые книги'>
					<MainPageMediaLayout videoUrl={publicFolderFilesUrls.mainPage.aboutBooksVideo}>
						<MainPageMediaContent>
							<Paragraph fontSize='16' lineHeight='24'>
								Начните прямо сейчас: Волшебник Изумрудного города и Копи царя Соломона. Каждый под свой
								уровень владения языком.
							</Paragraph>
							<MainPageMediaCovers
								covers={[
									{ url: publicFolderFilesUrls.mainPage.bookCover_1, level: 'A2-B2' },
									{ url: publicFolderFilesUrls.mainPage.bookCover_2, level: 'B2-C1' },
								]}
							/>
						</MainPageMediaContent>
						<MainPageMediaContent>
							<MainPageMediaParagraph>
								Хотите прочитать Гарри Поттера в оригинале или более серьёзнаю «Русскую революцию
								1891–1924»? Теперь это реально.
							</MainPageMediaParagraph>
							<MainPageMediaParagraph>Всё делается за 3 шага:</MainPageMediaParagraph>
							<MainPageMediaCircles
								config={[
									{
										accent: true,
										text: 'Найдите текст',
										iconUrl: publicFolderFilesUrls.mainPage.sign_1,
									},
									{
										text: 'Загрузите',
										iconUrl: publicFolderFilesUrls.mainPage.sign_2,
									},
									{
										text: 'Читайте',
										iconUrl: publicFolderFilesUrls.mainPage.sign_3,
									},
								]}
							/>
						</MainPageMediaContent>
					</MainPageMediaLayout>
				</MainPageHContentBlock>
				<MainPageHContentBlock num='03' header='Смотрите любимые фильмы'>
					<MainPageMediaLayout reverseDirection videoUrl={publicFolderFilesUrls.mainPage.aboutVideosVideo}>
						<MainPageMediaContent>
							<MainPageMediaParagraph>
								Начните прямо сейчас: «Шарада» и «Его девушка Пятница». Несложные фильмы для понимания
								даже для начинающих.
							</MainPageMediaParagraph>
							<MainPageMediaCovers
								covers={[
									{ url: publicFolderFilesUrls.mainPage.videoCover_1, level: 'A2-B1' },
									{ url: publicFolderFilesUrls.mainPage.videoCover_2, level: 'B1-B2' },
								]}
							/>
						</MainPageMediaContent>
						<MainPageMediaContent>
							<MainPageMediaParagraph>
								Или если давно хотели посмотреть «Пиратов карибского моря» в оригинале, то это возможно
								за 3 шага:
							</MainPageMediaParagraph>
							<MainPageMediaCircles
								config={[
									{
										accent: true,
										text: 'Найдите фильм и субтитры',
										iconUrl: publicFolderFilesUrls.mainPage.sign_4,
									},
									{
										text: 'Загрузите',
										iconUrl: publicFolderFilesUrls.mainPage.sign_5,
									},
									{
										text: 'Смотрите',
										iconUrl: publicFolderFilesUrls.mainPage.sign_6,
									},
								]}
							/>
						</MainPageMediaContent>
					</MainPageMediaLayout>
				</MainPageHContentBlock>
				<GoToReadingButton />
				<FaqOnMainPage />
			</main>
		</PageWrapper>
	)
}

export default MainPage
