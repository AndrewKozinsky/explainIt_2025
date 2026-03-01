'use client'

import React from 'react'
import { redirect } from 'next/navigation'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import Spinner from '@/ui/Spinner/Spinner'
import { pageUrls } from '@/сonsts/pageUrls'
import { ConfirmationStatus, useConfirmEmail } from './fn/confirmEmail'

function AuthConfirmEmailPage() {
	const confirmationStatus = useConfirmEmail()

	const contentMapper: Record<Exclude<ConfirmationStatus, 'success'>, React.ReactNode> = {
		loading: <Spinner size='small' />,
		error: <ErrorMessage text='Код подтверждения или не найден или истёк.' />,
	}

	if (confirmationStatus === 'success') {
		redirect(pageUrls.auth.login.path)
	}

	return contentMapper[confirmationStatus]
}

export default AuthConfirmEmailPage
