'use client'

import React from 'react'
import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import { pageUrls, localizePath } from 'utils/pageUrls'
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'
import Spinner from '../../../ui/Spinner/Spinner'
import { useAuthorizeUser } from './fn/authorizeUser'

type ProviderType = 'github' | 'google' | 'yandex'

type OAuthPageProps = {
	providerType: ProviderType
}

function OAuthPage(props: OAuthPageProps) {
	const { providerType } = props

	const { authorizationStatus, error } = useAuthorizeUser(providerType)
	const locale = useLocale()

	if (authorizationStatus === 'loading') {
		return <Spinner size='small' />
	} else if (authorizationStatus === 'error') {
		return <ErrorMessage text={error} />
	}

	redirect(localizePath(locale, pageUrls.books.path))
}

export default OAuthPage
