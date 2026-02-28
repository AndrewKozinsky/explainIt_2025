'use client'

import React from 'react'
import { redirect } from 'next/navigation'
import ErrorMessage from '../../../ui/ErrorMessage/ErrorMessage'
import Spinner from '../../../ui/Spinner/Spinner'
import { useAuthorizeUser } from './fn/authorizeUser'
import { pageUrls } from 'сonsts/pageUrls'

type ProviderType = 'github' | 'google' | 'yandex'

type OAuthPageProps = {
	providerType: ProviderType
}

function OAuthPage(props: OAuthPageProps) {
	const { providerType } = props

	const { authorizationStatus, error } = useAuthorizeUser(providerType)

	if (authorizationStatus === 'loading') {
		return <Spinner size='small' />
	} else if (authorizationStatus === 'error') {
		return <ErrorMessage text={error} />
	}

	redirect(pageUrls.books.path)
}

export default OAuthPage
