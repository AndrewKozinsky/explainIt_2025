'use client'

import { useAuth_GetMe } from '@/graphql'
import React, { useEffect } from 'react'
import { useUserStore } from 'stores/userStore'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'

function Balance() {
	const { data, loading, error } = useAuth_GetMe()

	useEffect(
		function () {
			if (loading) return

			if (error || !data) {
				useUserStore.getState().setUser(null)
				return
			}

			useUserStore.getState().setUser(data.auth_getMe)
		},
		[loading, data, error],
	)

	if (loading) {
		return <p>Получение текущего баланса.</p>
	}
	if (error || !data?.auth_getMe) {
		return (
			<p>
				Ошибка при получении баланса: <ErrorMessage text={error?.message || 'Неизвестная ошибка'} />
			</p>
		)
	}
	const balance = (data.auth_getMe.balance / 100).toFixed(2).replace('.', ',')
	return (
		<div>
			<p>Текущий баланс: {balance} руб.</p>
			<p>
				Каждое обращение к ИИ расходует баланс — в среднем 5–15 копеек. Стоимость зависит от сложности перевода.
			</p>
		</div>
	)
}

export default Balance
