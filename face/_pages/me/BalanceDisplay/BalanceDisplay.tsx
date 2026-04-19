'use client'

import LoadingMessage from 'ui/LoadingMessage/LoadingMessage'
import { useBalanceDisplay } from './fn/useBalanceDisplay'
import './BalanceDisplay.scss'

function BalanceDisplay() {
	const { isLoading, formattedBalance, hasUser } = useBalanceDisplay()

	if (isLoading) {
		return (
			<div className='balance-display'>
				<LoadingMessage text='Загрузка...' />
			</div>
		)
	}

	if (!hasUser) {
		return null
	}

	return (
		<div className='balance-display'>
			<span className='balance-display__label'>Баланс:</span>
			<span className='balance-display__value'>{formattedBalance}</span>
		</div>
	)
}

export default BalanceDisplay
