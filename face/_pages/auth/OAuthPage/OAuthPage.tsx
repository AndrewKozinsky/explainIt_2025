'use client'

import { redirect } from 'next/navigation'
import React from 'react'
import ErrorMessage from '../../../ui/ErrorMessage/ErrorMessage'
import Spinner from '../../../ui/Spinner/Spinner'
import { pageUrls } from 'сonsts/pageUrls'
import { useAuthorizeUser } from './fn/authorizeUser'

type ProviderType = 'github' | 'google' | 'yandex'

type OAuthPageProps = {
	providerType: ProviderType
}

function OAuthPage(props: OAuthPageProps) {
	const { providerType } = props

	const { authorizationStatus, error } = useAuthorizeUser(providerType)

	if (authorizationStatus === 'loading') {
		return <Spinner />
	} else if (authorizationStatus === 'error') {
		return <ErrorMessage text={error} />
	}

	redirect(pageUrls.books.path)
}

export default OAuthPage
