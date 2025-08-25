import RouteNames from '../../infrastructure/routeNames'
import { OAuthProviderType } from '../../routes/auth/inputs/loginWithOAuth.input'

export const queriesBook = {
	create(dto: { author?: null | string; name?: null | string; note?: null | string }) {
		return {
			query: `
				mutation CreateBook($input: CreateBookInput!) {
				 ${RouteNames.BOOK.CREATE}(input: $input) {
					id
					author
					name
					note
					userId
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
        ${RouteNames.BOOK.UPDATE}(input: $input) {
          id
          author
          name
          note
          userId
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
        ${RouteNames.BOOK.DELETE}(input: $input)
      }`,
			variables: {
				input: dto,
			},
		}
	},

	getUserBooks() {
		return `query {
			  ${RouteNames.BOOK.GET_USER_BOOKS} {
				id
				author
				name
				note
				userId
			  }
			}`
	},
}
