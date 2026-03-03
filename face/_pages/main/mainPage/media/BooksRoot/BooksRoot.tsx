import Paragraph from 'ui/Paragraph/Paragraph'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import MainPageHContentBlock from '../../MainPageContentBlock/MainPageContentBlock'
import MainPageMediaCircles from '../MainPageMediaCircles/MainPageMediaCircles'
import MainPageMediaContent from '../MainPageMediaContent/MainPageMediaContent'
import MainPageMediaCovers from '../MainPageMediaCovers/MainPageMediaCovers'
import { MainPageMediaLayout } from '../MainPageMediaLayout/MainPageMediaLayout'
import MainPageMediaParagraph from '../MainPageMediaParagraph/MainPageMediaParagraph'

export function BooksRoot() {
	return (
		<MainPageHContentBlock num='02' header='Читайте любые книги'>
			<MainPageMediaLayout
				videoUrl={publicFolderFilesUrls.mainPage.aboutBooksVideo}
				videoCoverUrl={publicFolderFilesUrls.mainPage.aboutBooksVideoPoster}
			>
				<MainPageMediaContent>
					<Paragraph fontSize='16' lineHeight='24'>
						Начните прямо сейчас: Волшебник Изумрудного города и Копи царя Соломона. Каждый под свой уровень
						владения языком.
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
						Хотите прочитать Гарри Поттера в оригинале или более серьёзнаю «Русскую революцию 1891–1924»?
						Теперь это реально.
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
	)
}
