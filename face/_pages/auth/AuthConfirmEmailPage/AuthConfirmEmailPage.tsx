'use client'

import { redirect } from 'next/navigation'
import React from 'react'
import ErrorBlock from '@/ui/ErrorBlock/ErrorBlock'
import Spinner from '@/ui/Spinner/Spinner'
import { ConfirmationStatus, useConfirmEmail } from './fn/confirmEmail'
import { pageUrls } from '@/сonsts/pageUrls'

function AuthConfirmEmailPage() {
	const confirmationStatus = useConfirmEmail()

	const contentMapper: Record<Exclude<ConfirmationStatus, 'success'>, React.ReactNode> = {
		loading: <Spinner />,
		error: <ErrorBlock>Код подтверждения или не найден или истёк.</ErrorBlock>,
	}

	if (confirmationStatus === 'success') {
		redirect(pageUrls.auth.login.path)
	}

	return contentMapper[confirmationStatus]
}

export default AuthConfirmEmailPage
