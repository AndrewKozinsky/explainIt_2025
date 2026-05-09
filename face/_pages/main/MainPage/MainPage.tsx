import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import CustomMaterials from '_pages/main/CustomMaterials/CustomMaterials'
import MainPageFaq from '_pages/main/MainPageFaq/MainPageFaq'
import AvailableMaterials from '../AvailableMaterials/AvailableMaterials'
import MainPageTop from '../MainPageTop/MainPageTop'
import './MainPage.scss'

function MainPage() {
	return (
		<PageWrapper top bottom>
			<main className='main-page'>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				<MainPageTop />
				<AvailableMaterials />
				<CustomMaterials />
				<MainPageFaq />
			</main>
		</PageWrapper>
	)
}

export default MainPage
