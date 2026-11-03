import { PageWrapper } from '@/shared/ui/pageRelated/PageWrapper/PageWrapper'
import MainPageAnyLevel from '@/widgets/mainPage/mainPageAnyLevel/MainPageAnyLevel/MainPageAnyLevel'
import MainPageBanner from '@/widgets/mainPage/mainPageBanner/MainPageBanner/MainPageBanner'
import MainPageFaq from '@/widgets/mainPage/MainPageFaq/MainPageFaq'
import MainPageFeatures from '@/widgets/mainPage/mainPageFeatures/MainPageFeatures/MainPageFeatures'
import MainPageScenarios from '@/widgets/mainPage/mainPageScenarios/MainPageScenarios/MainPageScenarios'
import './MainPage.scss'

function MainPage() {
	return (
		<PageWrapper withTop withBottom>
			<main className='main-page'>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				<MainPageBanner />
				<MainPageScenarios />
				<MainPageAnyLevel />
				<MainPageFeatures />
				<MainPageFaq />
			</main>
		</PageWrapper>
	)
}

export default MainPage
