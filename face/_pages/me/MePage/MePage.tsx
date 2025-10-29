import React from 'react'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import IncreaseBalanceForm from '../IncreaseBalanceForm/IncreaseBalanceForm'
import LogoutButton from '../LogoutButton/LogoutButton'
import Balance from '../Balance/Balance'
import './MePage.scss'

function MePage() {
	return (
		<PageWrapper top bottom>
			<main className='me-page'>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				<Balance />
				<IncreaseBalanceForm />
				<LogoutButton />
			</main>
		</PageWrapper>
	)
}

export default MePage
