export const serverTestDataConfig = {
	getUsersConfig(): UsersConfig {
		return usersConfig
	},
}

export type UserWithUnconfirmedEmailConfig = {
	type: 'userWithUnconfirmedEmail'
	// Initially user id is null.
	// When he was created number was set here.
	id: null | number
	email: string
	password: string
	books?: UserBookConfig[]
}

export type UserRegisteredWithCredentialsConfig = {
	type: 'userRegisteredWithCredentials'
	// Initially user id is null.
	// When he was created number was set here.
	id: null | number
	email: string
	password: string
	books?: UserBookConfig[]
}

export type UserRegisteredWithOAuthConfig = {
	type: 'userRegisteredWithOAuth'
	// Initially user id is null.
	// When he was created number was set here.
	id: null | number
	email: string
	books?: UserBookConfig[]
}

export type UserRegisteredWithCredentialsAndOAuthConfig = {
	type: 'userRegisteredWithCredentialsAndOAuth'
	// Initially user id is null.
	// When he was created number was set here.
	id: null | number
	email: string
	password: string
	books?: UserBookConfig[]
}

type UserConfig =
	| UserWithUnconfirmedEmailConfig
	| UserRegisteredWithCredentialsConfig
	| UserRegisteredWithOAuthConfig
	| UserRegisteredWithCredentialsAndOAuthConfig

export type UserBookConfig = {
	id: null | number
	author?: null | string
	name?: null | string
	note?: null | string
	chapters?: UserBookChapterConfig[]
}

export type UserBookChapterConfig = {
	id: null | number
	name?: null | string
	header?: null | string
	content?: null | string
	note?: null | string
}

export type UsersConfig = Record<string, UserConfig>

const usersConfig = {
	// A user with unconfirmed email
	/*user_1: {
		type: 'userWithUnconfirmedEmail',
		id: null,
		email: 'user-1@email.com',
		password: 'password-1',
	},
	user_2: {
		type: 'userRegisteredWithCredentials',
		id: null,
		email: 'user-2@email.com',
		password: 'password-2',
	},*/
	user_3: {
		type: 'userRegisteredWithOAuth',
		id: null,
		email: 'user-3@email.com',
	},
	/*user_4: {
		type: 'userRegisteredWithCredentialsAndOAuth',
		id: null,
		email: 'user-4@email.com',
		password: 'password-3',
	},
	user_5: {
		type: 'userRegisteredWithCredentials',
		id: null,
		email: 'user-5@email.com',
		password: 'password-5',
		books: [
			{
				id: null,
				author: 'Book 1 author',
				note: 'Book 1 note',
				name: 'Book 1 name',
				chapters: [
					{
						id: null,
						name: 'Book 1, Chapter 1',
						header: 'Book 1, Chapter 1 header',
						content: 'Book 1, Chapter 1 content',
						note: 'Book 1, Chapter 1 note',
					},
				],
			},
			{
				id: null,
				author: 'Book 2 author',
				note: 'Book 2 note',
				name: 'Book 2 name',
				chapters: [
					{
						id: null,
						name: 'Book 2, Chapter 1',
						header: 'Book 2, Chapter 1 header',
						content: 'Book 2, Chapter 1 content',
						note: 'Book 2, Chapter 1 note',
					},
					{
						id: null,
						name: 'Book 2, Chapter 2',
						header: 'Book 2, Chapter 2 header',
						content: 'Book 2, Chapter 2 content',
						note: 'Book 2, Chapter 2 note',
					},
					{
						id: null,
						name: 'Book 2, Chapter 3',
						header: 'Book 2, Chapter 3 header',
						content: 'Book 2, Chapter 3 content',
						note: 'Book 2, Chapter 3 note',
					},
				],
			},
		],
	},*/
} satisfies UsersConfig
