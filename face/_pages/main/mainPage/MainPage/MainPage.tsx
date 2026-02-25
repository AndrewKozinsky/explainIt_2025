import React from 'react'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
// import MainPageHeader from '_pages/main/mainPage/MainPageHeader/MainPageHeader'
// import MainPageHeroImage from '_pages/main/mainPage/MainPageHeroImage/MainPageHeroImage'
// import GoToReadingButton from '../GoToReadingButton/GoToReadingButton'
import './MainPage.scss'

function MainPage() {
	return (
		<PageWrapper top bottom>
			<main className='main-page'>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				{/*<MainPageHeader />*/}
				{/*<MainPageHeroImage />*/}
				{/*<GoToReadingButton />*/}
			</main>
		</PageWrapper>
	)
}

export default MainPage
