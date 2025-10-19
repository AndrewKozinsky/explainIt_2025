import React from 'react'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import IncreaseBalanceForm from '../IncreaseBalanceForm/IncreaseBalanceForm'
import LogoutButton from '../LogoutButton/LogoutButton'

function MePage() {
	return (
		<PageWrapper top bottom>
			<main>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				<IncreaseBalanceForm />
				<LogoutButton />
			</main>
		</PageWrapper>
	)
}

export default MePage
