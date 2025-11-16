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
	analysePhrase(dto: {
		bookChapterId: number
		bookAuthor: null | string
		bookName: null | string
		context: string
		sentenceId: number
		sentence: string
		phrase: string
		phraseWordsIdx: number[]
	}) {
		return {
			query: `
      query AnalysePhrase($input: AnalysePhraseInput!) {
        ${RouteNames.BOOK_CHAPTER.ANALYSE_PHRASE}(input: $input) {
			id
			sentenceId
			sentence
			transcription
			phrase
			phraseWordsIdx
			translation
			analysis
			examples {
				id
				sentence
				translation
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
			query: `
      query TranslateSentences($input: TranslateSentencesInput!) {
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
	deleteChapterPhrases(dto: { bookChapterId: number }) {
		return {
			query: `
      mutation DeleteBookChapterPhrases($input: DeleteBookChapterPhrasesInput!) {
        ${RouteNames.BOOK_CHAPTER.DELETE_BOOK_CHAPTER_PHRASES}(input: $input)
      }
    `,
			variables: {
				input: dto,
			},
		}
	},
}
