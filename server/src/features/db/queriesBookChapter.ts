import RouteNames from '../../infrastructure/routeNames'

export const queriesBookChapter = {
	create(dto: {
		bookId: number
		name?: null | string
		header?: null | string
		content?: null | string
		note?: null | string
	}) {
		return {
			query: `
				mutation CreateBookChapter($input: CreateBookChapterInput!) {
				 ${RouteNames.BOOK_CHAPTER.CREATE}(input: $input) {
					id
					bookId
					name
					header
					content
					note
			  	}
			}
			`,
			variables: {
				input: dto,
			},
		}
	},
	update(dto: {
		id: number
		name?: null | string
		header?: null | string
		content?: null | string
		note?: null | string
	}) {
		return {
			query: `
      mutation UpdateBookChapter($input: UpdateBookChapterInput!) {
        ${RouteNames.BOOK_CHAPTER.UPDATE}(input: $input) {
          id
          bookId
          name
          header
          content
          note
        }
      }
    `,
			variables: {
				input: dto,
			},
		}
	},
	delete(dto: { id: number }) {
		return {
			query: `
      mutation DeleteBookChapter($input: DeleteBookChapterInput!) {
        ${RouteNames.BOOK_CHAPTER.DELETE}(input: $input)
      }
    `,
			variables: {
				input: dto,
			},
		}
	},
}
