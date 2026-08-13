import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { authQueries } from '@/entities/auth/AuthQueryFacade'

export type ConfirmationStatus = 'loading' | 'success' | 'error'

export function useConfirmEmail() {
	const { mutateAsync: confirmEmail } = useMutation(authQueries.confirmEmail())

	const [confirmationStatus, setConfirmationStatus] = useState<ConfirmationStatus>('loading')

	const searchParams = useSearchParams()
	const confirmationCode = searchParams.get('code')

	useEffect(
		function () {
			if (!confirmationCode) {
				setConfirmationStatus('error')
				return
			}

			confirmEmail({ code: confirmationCode }).then(function (result) {
				if (result.error) {
					console.log(result.error)
					setConfirmationStatus('error')
					return
				}
				setConfirmationStatus('success')
			})
		},
		[confirmationCode, confirmEmail],
	)

	return confirmationStatus
}
