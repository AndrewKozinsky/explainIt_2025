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
}
