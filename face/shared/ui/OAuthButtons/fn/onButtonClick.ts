import { useCallback } from 'react'
import { localStorageManager } from 'utils/localStorageManager'
import { pageUrls } from 'utils/pageUrls'
import { generateRandomString } from 'utils/strings'
import { env } from 'сonsts/env'

type ButtonType = 'github' | 'google' | 'yandex'

export function useGetOnButtonClick(buttonType: ButtonType) {
	return useCallback(
		function () {
			const providerStateMapper: Record<ButtonType, string> = {
				github: generateRandomString(),
				google: generateRandomString(),
				yandex: generateRandomString(),
			}

			const providerPageUrlMapper: Record<ButtonType, string> = {
				github: pageUrls.auth.oauth.github.getPermissions({
					clientId: env.auth.github.clientId,
					state: providerStateMapper.github,
					redirectUri: env.auth.github.redirectUrl,
				}).path,
				google: pageUrls.auth.oauth.google.getPermissions({
					clientId: env.auth.google.clientId,
					state: providerStateMapper.google,
					redirectUri: env.auth.google.redirectUrl,
				}).path,
				yandex: pageUrls.auth.oauth.yandex.getPermissions({
					clientId: env.auth.yandex.clientId,
					state: providerStateMapper.yandex,
					redirectUri: env.auth.yandex.redirectUrl,
				}).path,
			}

			const providerPageUrl = providerPageUrlMapper[buttonType]
			const providerState = providerPageUrlMapper[buttonType]

			localStorageManager.oauth.setCSRFToken(providerState)

			window.location.assign(providerPageUrl)
		},
		[buttonType],
	)
}
