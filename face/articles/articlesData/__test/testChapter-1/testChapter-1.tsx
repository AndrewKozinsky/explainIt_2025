import ArticleType from '../../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'

const testChapter1: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'test-1',
		name: 'Тестовая статья',
		description: 'Описание статьи для тестов.',
		keywords: ''
	},
	content: [exercises_1, exercises_2],
}

export default testChapter1
