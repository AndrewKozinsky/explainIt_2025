import { PageWrapper } from '@/shared/ui/pageRelated/PageWrapper/PageWrapper'
import AvailableMaterials from '@/widgets/mainPage/AvailableMaterials/AvailableMaterials'
import CustomMaterials from '@/widgets/mainPage/CustomMaterials/CustomMaterials'
import MainPageFaq from '@/widgets/mainPage/MainPageFaq/MainPageFaq'
import MainPageFeatures from '@/widgets/mainPage/MainPageFeatures/MainPageFeatures'
import MainPageTop from '@/widgets/mainPage/MainPageTop/MainPageTop'
import './MainPage.scss'

function MainPage() {
	return (
		<PageWrapper withTop withBottom>
			<main className='main-page'>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				<MainPageTop />
				<MainPageFeatures />
				<AvailableMaterials />
				<CustomMaterials />
				<MainPageFaq />
			</main>
		</PageWrapper>
	)
}

export default MainPage
