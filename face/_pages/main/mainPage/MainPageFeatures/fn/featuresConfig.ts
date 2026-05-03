import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'

const featuresConfig = [
	{
		name: 'Перевод предложения и слова',
		videoUrl: publicFolderFilesUrls.mainPage.features.translationVideoUrl,
	},
	{
		name: 'Транскрипция и озвучка',
		videoUrl: publicFolderFilesUrls.mainPage.features.transcriptionVideoUrl,
	},
	{
		name: 'Добавление в словарь',
		videoUrl: publicFolderFilesUrls.mainPage.features.dictionaryVideoUrl,
	},
	{
		name: 'Задавайте вопросы ИИ',
		videoUrl: publicFolderFilesUrls.mainPage.features.llmVideoUrl,
	},
	{
		name: 'Фильмы с субтитрами',
		videoUrl: publicFolderFilesUrls.mainPage.features.videoVideoUrl,
	},
]

export default featuresConfig
