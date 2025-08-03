export const env = {
	auth: {
		github: {
			clientId: process.env.NEXT_PUBLIC_OAUTH_GITHUB_CLIENT_ID as string,
			redirectUrl: process.env.NEXT_PUBLIC_OAUTH_GITHUB_REDIRECT_URL as string,
		},
		google: {
			clientId: process.env.NEXT_PUBLIC_OAUTH_GOOGLE_CLIENT_ID as string,
			redirectUrl: process.env.NEXT_PUBLIC_OAUTH_GOOGLE_REDIRECT_URL as string,
		},
		yandex: {
			clientId: process.env.NEXT_PUBLIC_OAUTH_YANDEX_CLIENT_ID as string,
			redirectUrl: process.env.NEXT_PUBLIC_OAUTH_YANDEX_REDIRECT_URL as string,
		},
	},
}
