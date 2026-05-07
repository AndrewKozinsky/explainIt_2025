import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import AvailableMaterials from '../AvailableMaterials/AvailableMaterials'
import FaqOnMainPage from '../FaqOnMainPage/FaqOnMainPage'
// import GoToReadingButton from '../GoToReadingButton/GoToReadingButton'
import MainPageTop from '../MainPageTop/MainPageTop'
import './MainPage.scss'

function MainPage() {
	return (
		<PageWrapper top bottom>
			<main className='main-page'>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				<MainPageTop />
				<AvailableMaterials />
				{/*<GoToReadingButton />*/}
				{/*<FaqOnMainPage />*/}
			</main>
		</PageWrapper>
	)
}

export default MainPage
