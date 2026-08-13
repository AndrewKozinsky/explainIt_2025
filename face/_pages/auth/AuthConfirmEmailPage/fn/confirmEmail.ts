import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AuthService } from '@/entities/auth/AuthService'
import { AuthApi } from '@/entities/auth/repository/AuthApi'
import { useAsyncMutation } from '@/shared/utils/fetchData/useAsyncMutation'

export type ConfirmationStatus = 'loading' | 'success' | 'error'

export function useConfirmEmail() {
	const service = useMemo(() => new AuthService(new AuthApi()), [])
	const { mutate: confirmEmail } = useAsyncMutation((input: { code: string }) => service.confirmEmail(input))

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
