'use client'

import React from 'react'
import { useAuthorizeUser } from './fn/authorizeUser'

type ProviderType = 'github' | 'google' | 'yandex'

type OAuthPageProps = {
	providerType: ProviderType
}

function OAuthPage(props: OAuthPageProps) {
	const { providerType } = props

	useAuthorizeUser(providerType)

	return <div>{providerType}</div>
}

export default OAuthPage
