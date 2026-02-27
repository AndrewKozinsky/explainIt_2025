import RouteNames from 'infrastructure/routeNames'

export const queriesBookChapter = {
	create(dto: {
		bookType: 'public' | 'private'
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
					name
					header
					content
					note
					book {
						id
						name
						author
						note
						userId
					}
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
          name
          header
          content
          note
          book {
			id
			name
			author
			note
			userId
		  }
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
	get(dto: { id: number; bookType: 'public' | 'private' }) {
		return {
			query: `
      query GetBookChapter($input: GetBookChapterInput!) {
        ${RouteNames.BOOK_CHAPTER.GET}(input: $input) {
          id
          name
          header
          content
          note
          book {
			id
			name
			author
			note
			userId
		  }
		  phrases {
			id
			sentence
			phrase
			translation
			analysis
			examples {
				id
				sentence
				translation
			}
		  }
        }
      }
    `,
			variables: {
				input: dto,
			},
		}
	},
	translateSentences(dto: { bookAuthor: null | string; bookName: null | string; sentences: string[] }) {
		return {
			mutation: `
      mutation TranslateSentences($input: TranslateSentencesInput!) {
        ${RouteNames.BOOK_CHAPTER.TRANSLATE_SENTENCES}(input: $input) {
			translates
        }
      }
    `,
			variables: {
				input: dto,
			},
		}
	},
}
