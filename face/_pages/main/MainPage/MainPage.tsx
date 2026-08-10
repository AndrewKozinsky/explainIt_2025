import { PageWrapper } from '@/shared/ui/pageRelated/PageWrapper/PageWrapper'
import MainPageFaq from '@/widgets/mainPage/MainPageFaq/MainPageFaq'
import MainPageTop from '@/widgets/mainPage/MainPageTop/MainPageTop'
import './MainPage.scss'

function MainPage() {
	return (
		<PageWrapper withTop withBottom>
			<main className='main-page'>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				<MainPageTop />
				<MainPageFaq />
			</main>
		</PageWrapper>
	)
}

export default MainPage
