import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import FaqOnMainPage from '../FaqOnMainPage/FaqOnMainPage'
// import GoToReadingButton from '../GoToReadingButton/GoToReadingButton'
// import MainPageHContentBlock from '../MainPageContentBlock/MainPageContentBlock'
import MainPageFeatures from '../MainPageFeatures/MainPageFeatures'
import MainPageTop from '../MainPageTop/MainPageTop'
import './MainPage.scss'

function MainPage() {
	return (
		<PageWrapper top bottom>
			<main className='main-page'>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				<MainPageTop />
				<MainPageFeatures />
				{/*<GoToReadingButton />*/}
				<FaqOnMainPage />
			</main>
		</PageWrapper>
	)
}

export default MainPage
