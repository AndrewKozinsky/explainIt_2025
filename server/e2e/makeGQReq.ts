import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { App } from 'supertest/types'
import { MainConfigService } from '../src/infrastructure/mainConfig/mainConfig.service'

export async function makeGraphQLReq(app: INestApplication<App>, query: string) {
	return base({ app, query })
}

/*export async function makeGraphQLReqWithTokens(props: {
	app: INestApplication<App>
	query: string
	refreshTokenStr?: string
	refreshTokenMaxAgeInSeconds?: number
	accessTokenStr?: string
	accessTokenMaxAgeInSeconds?: number
	mainConfig: MainConfigService
}) {
	return base(props)
}*/

async function base(props: {
	app: INestApplication<App>
	query: string
	refreshTokenStr?: string
	refreshTokenMaxAgeInSeconds?: number | string
	accessTokenStr?: string
	accessTokenMaxAgeInSeconds?: number | string
	mainConfig?: MainConfigService
}) {
	const supertestRequest = request(props.app.getHttpServer())
		.post('/graphql')
		.set(
			'User-Agent',
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
		)

	/*if (props.refreshTokenStr) {
		let refreshTokenCookie = props.mainConfig!.get().refreshToken.name + '=' + props.refreshTokenStr
		if (props.refreshTokenMaxAgeInSeconds) {
			refreshTokenCookie += `max-age=${props.refreshTokenMaxAgeInSeconds}; Path=/`
		}

		supertestRequest.set('Cookie', refreshTokenCookie)
	}*/

	/*if (props.accessTokenStr) {
		let accessTokenCookie = props.mainConfig!.get().accessToken.name + '=' + props.accessTokenStr
		if (props.accessTokenMaxAgeInSeconds) {
			accessTokenCookie += `max-age=${props.accessTokenMaxAgeInSeconds}; Path=/`
		}

		supertestRequest.set('Cookie', accessTokenCookie)
	}*/

	const response = await supertestRequest.send({ query: props.query })
	const cookies = extractCookies(response.headers['set-cookie'] as any)

	return [response.body, cookies]
}

type CookiesObj = Record<string, CookieObj>

type CookieObj = {
	value: string
	maxAge: number // 2592000
	path: string // '/'
	expires: 'None'
	secure: boolean
	sameSite: 'None'
}

function extractCookies(cookieArray: undefined | string[]): CookiesObj {
	if (!cookieArray || cookieArray.length === 0) {
		return {}
	}

	const cookieObject: CookiesObj = {}

	cookieArray.forEach((cookieString) => {
		const parts = cookieString.split(';').map((part) => part.trim())

		if (parts.length === 0) return

		const [key, value] = parts[0].split('=').map((part) => part.trim())
		if (!key) return

		const cookieData = { value: decodeURIComponent(value || '') } as CookieObj

		for (let i = 1; i < parts.length; i++) {
			const [attribute, attrValue] = parts[i].split('=').map((part) => part.trim())

			if (!attribute) continue
			switch (attribute.toLowerCase()) {
				case 'max-age':
					cookieData.maxAge = parseInt(attrValue)
					break
				case 'path':
					cookieData.path = attrValue
					break
				case 'expires':
					cookieData.expires = attrValue as CookieObj['expires']
					break
				case 'secure':
					cookieData.secure = true
					break
				case 'samesite':
					cookieData.sameSite = attrValue as CookieObj['sameSite']
					break
			}
		}

		cookieObject[key] = cookieData
	})

	return cookieObject
}
