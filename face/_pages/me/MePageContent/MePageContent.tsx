import React from 'react'
import BalanceDisplay from '../BalanceDisplay/BalanceDisplay'
import BalanceTopUpForm from '../BalanceTopUpForm/BalanceTopUpForm'
import LogoutButton from '../LogoutButton/LogoutButton'
import './MePageContent.scss'

function MePageContent() {
	return (
		<main className='me-page-content'>
			{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
			<BalanceDisplay />
			<BalanceTopUpForm />
			<LogoutButton />
		</main>
	)
}

export default MePageContent
