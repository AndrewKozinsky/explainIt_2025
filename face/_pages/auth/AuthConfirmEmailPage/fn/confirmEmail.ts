import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth_ConfirmEmail } from '../../../../graphql'

export type ConfirmationStatus = 'loading' | 'success' | 'error'

export function useConfirmEmail() {
	const [confirmEmail] = useAuth_ConfirmEmail()

	const [confirmationStatus, setConfirmationStatus] = useState<ConfirmationStatus>('loading')

	const searchParams = useSearchParams()
	const confirmationCode = searchParams.get('code')

	useEffect(
		function () {
			if (!confirmationCode) {
				setConfirmationStatus('error')
				return
			}

			confirmEmail({
				variables: {
					input: {
						code: confirmationCode,
					},
				},
			})
				.then(function () {
					setConfirmationStatus('success')
				})
				.catch(function (err) {
					console.log(err)
					setConfirmationStatus('error')
				})
		},
		[confirmationCode, confirmEmail],
	)

	return confirmationStatus
}
