'use client'

import React from 'react'
import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import Spinner from '@/shared/ui/Spinner/Spinner'
import { pageUrls, localizePath } from '@/shared/utils/pageUrls'
import { useAuthorizeUser } from './fn/authorizeUser'

type OAuthPageProps = {
	providerType: string
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
