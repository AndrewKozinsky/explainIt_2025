import RouteNames from 'infrastructure/routeNames'

export const queriesBookPublic = {
	getBooks() {
		return `query {
			  ${RouteNames.BOOK_PUBLIC.GET_BOOKS} {
				id
				author
				name
				note
				cover
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
	getBook(dto: { id: number }) {
		return {
			query: `
				query GetBookPublic($input: GetBookPublicInput!) {
					${RouteNames.BOOK_PUBLIC.GET_BOOK}(input: $input) {
						id
						author
						name
						note
						cover
						chapters {
							id
							bookId
							name
							header
							note
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
