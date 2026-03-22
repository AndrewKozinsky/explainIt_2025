import RouteNames from 'infrastructure/routeNames'

export const queriesBook = {
	create(dto: { author?: null | string; name?: null | string; note?: null | string }) {
		return {
			query: `
				mutation CreateBook($input: CreateBookInput!) {
				 ${RouteNames.BOOK_PRIVATE.CREATE}(input: $input) {
					id
					author
					name
					languageCode
					note
					userId
					chapters {
						id
						bookId
						name
						header
						note
					}
			  	}
			}`,
			variables: {
				input: dto,
			},
		}
	},
	update(dto: { id: number; author?: null | string; name?: null | string; note?: null | string }) {
		return {
			query: `
      mutation UpdateBook($input: UpdateBookInput!) {
        ${RouteNames.BOOK_PRIVATE.UPDATE}(input: $input) {
          id
          author
          name
          languageCode
          note
          userId
          chapters {
			id
			bookId
			name
			header
			note
		  }
        }
      }`,
			variables: {
				input: dto,
			},
		}
	},

	delete(dto: { id: number }) {
		return {
			query: `
      mutation DeleteBook($input: DeleteBookInput!) {
        ${RouteNames.BOOK_PRIVATE.DELETE}(input: $input)
      }`,
			variables: {
				input: dto,
			},
		}
	},

	getUserBooks() {
		return `query {
			  ${RouteNames.BOOK_PRIVATE.GET_USER_BOOKS} {
				id
				author
				name
				languageCode
				note
				userId
				chapters {
					id
					bookId
					name
					header
					note
				}
			  }
			}`
	},
}
