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
}

export type userRegisteredWithCredentialsConfig = {
	type: 'userRegisteredWithCredentials'
	// Initially user id is null.
	// When he was created number was set here.
	id: null | number
	email: string
	password: string
}

export type UserRegisteredWithOAuthConfig = {
	type: 'userRegisteredWithOAuth'
	// Initially user id is null.
	// When he was created number was set here.
	id: null | number
	email: string
}

export type userRegisteredWithCredentialsAndOAuthConfig = {
	type: 'userRegisteredWithCredentialsAndOAuth'
	// Initially user id is null.
	// When he was created number was set here.
	id: null | number
	email: string
	password: string
}

type UserConfig =
	| UserWithUnconfirmedEmailConfig
	| userRegisteredWithCredentialsConfig
	| UserRegisteredWithOAuthConfig
	| userRegisteredWithCredentialsAndOAuthConfig

export type UsersConfig = Record<string, UserConfig>

const usersConfig = {
	// A user with unconfirmed email
	user_1: {
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
	},
	user_3: {
		type: 'userRegisteredWithOAuth',
		id: null,
		email: 'user-3@email.com',
	},
	user_4: {
		type: 'userRegisteredWithCredentialsAndOAuth',
		id: null,
		email: 'user-4@email.com',
		password: 'password-3',
	},
} satisfies UsersConfig
