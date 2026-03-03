import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import MainPageHContentBlock from '../../MainPageContentBlock/MainPageContentBlock'
import MainPageMediaCircles from '../MainPageMediaCircles/MainPageMediaCircles'
import MainPageMediaContent from '../MainPageMediaContent/MainPageMediaContent'
import MainPageMediaCovers from '../MainPageMediaCovers/MainPageMediaCovers'
import { MainPageMediaLayout } from '../MainPageMediaLayout/MainPageMediaLayout'
import MainPageMediaParagraph from '../MainPageMediaParagraph/MainPageMediaParagraph'

export function VideosRoot() {
	return (
		<MainPageHContentBlock num='03' header='Смотрите любимые фильмы'>
			<MainPageMediaLayout
				reverseDirection
				videoUrl={publicFolderFilesUrls.mainPage.aboutVideosVideo}
				videoCoverUrl={publicFolderFilesUrls.mainPage.aboutVideosVideoPoster}
			>
				<MainPageMediaContent>
					<MainPageMediaParagraph>
						Начните прямо сейчас: «Шарада» и «Его девушка Пятница». Несложные фильмы для понимания даже для
						начинающих.
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
						Или если давно хотели посмотреть «Пиратов карибского моря» в оригинале, то это возможно за 3
						шага:
					</MainPageMediaParagraph>
					<MainPageMediaCircles
						config={[
							{
								accent: true,
								text: 'Найдите фильм',
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
	)
}
