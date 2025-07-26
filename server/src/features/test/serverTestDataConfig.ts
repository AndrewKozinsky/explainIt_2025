export const serverTestDataConfig = {
	getUsersConfig(): UsersConfig {
		return usersConfig
	},
}

type UserConfig = {
	// Initially user id is null.
	// When he was created number was set here.
	id: null | number
	email: string
	password: string
	confirmed: boolean
}

export type UsersConfig = Record<string, UserConfig>

const usersConfig = {
	// A user with unconfirmed email
	user_1: {
		id: null,
		email: 'user-1@email.com',
		password: 'password-1',
		confirmed: false,
	},
	user_2: {
		id: null,
		email: 'user-2@email.com',
		password: 'password-2',
		confirmed: true,
	},
	user_3: {
		id: null,
		email: 'user-3@email.com',
		password: 'password-3',
		confirmed: true,
	},
	user_4: {
		id: null,
		email: 'user-4@email.com',
		password: 'password-3',
		confirmed: true,
	},
} satisfies UsersConfig
