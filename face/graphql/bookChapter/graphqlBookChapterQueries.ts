import apolloClient from '../apollo'
import { BookChapter_Get, BookChapter_GetDocument } from '../index'

const graphqlBookChapterQueries = {
	getBookChapter(data: { chapterId: number }) {
		return apolloClient.query<BookChapter_Get>({
			query: BookChapter_GetDocument,
			variables: {
				input: {
					id: data.chapterId,
				},
			},
		})
	},
}
export default graphqlBookChapterQueries
