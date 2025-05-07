import ArticleType from '../../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'

const testChapter: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'test',
		articleName: 'Тестовая статья',
		articleDescription: 'Описание статьи для тестов.',
	},
	content: [exercises_1, exercises_2],
}

export default testChapter
