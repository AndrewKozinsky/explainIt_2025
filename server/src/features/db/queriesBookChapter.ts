import RouteNames from 'infrastructure/routeNames'

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
	get(dto: { id: number }) {
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
        }
      }
    `,
			variables: {
				input: dto,
			},
		}
	},
	analyseSentenceAndPhrase(dto: {
		bookChapterId: number
		bookAuthor: null | string
		bookName: null | string
		context: string
		sentence: string
		phrase: string
	}) {
		return {
			query: `
      query GetBookChapter($input: AnalyseSentenceAndPhraseInput!) {
        ${RouteNames.BOOK_CHAPTER.ANALYSE_SENTENCE_AND_PHRASE}(input: $input) {
			sentenceTranslation
			phrase {
				id
				phrase
				translation
				analysis
				examples {
					id
					sentence
					translate
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
}
