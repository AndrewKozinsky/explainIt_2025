import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import BalanceDisplay from '../BalanceDisplay/BalanceDisplay'
import BalanceTopUpForm from '../BalanceTopUpForm/BalanceTopUpForm'
import LogoutButton from '../LogoutButton/LogoutButton'
import './MePage.scss'

function MePage() {
	return (
		<PageWrapper top bottom>
			<main className='me-page'>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				<BalanceDisplay />
				<BalanceTopUpForm />
				<LogoutButton />
			</main>
		</PageWrapper>
	)
}

export default MePage
