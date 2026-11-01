import { PageWrapper } from '@/shared/ui/pageRelated/PageWrapper/PageWrapper'
import MainPageBanner from '@/widgets/mainPage/MainPageBanner/MainPageBanner'
import MainPageFaq from '@/widgets/mainPage/MainPageFaq/MainPageFaq'
import './MainPage.scss'

function MainPage() {
	return (
		<PageWrapper withTop withBottom>
			<main className='main-page'>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				<MainPageBanner />
				<MainPageFaq />
			</main>
		</PageWrapper>
	)
}

export default MainPage
