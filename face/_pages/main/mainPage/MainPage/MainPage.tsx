// import CourseFace from '../CourseFace/CourseFace'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
// import FeaturesGridOne from '../featuresGridOne/FeaturesGridOne/FeaturesGridOne'
import MainPageHeader from '../MainPageHeader/MainPageHeader'

function MainPage() {
	return (
		<PageWrapper top bottom>
			<main>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				<MainPageHeader />
				{/*<CourseFace />*/}
				{/*<FeaturesGridOne />*/}
			</main>
		</PageWrapper>
	)
}

export default MainPage
