import React from 'react'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import MainPageHeader from '_pages/main/mainPage/MainPageHeader/MainPageHeader'
import MainPageHeroImage from '_pages/main/mainPage/MainPageHeroImage/MainPageHeroImage'
import WhatAboutCostBlock from '_pages/main/mainPage/WhatAboutCostBlock/WhatAboutCostBlock'
import GoToReadingButton from '../GoToReadingButton/GoToReadingButton'
import ReadAnyBookBlock from '../ReadAnyBookBlock/ReadAnyBookBlock'
import WhatWillYouGetAfterAnalysis from '../WhatWillYouGetAfterAnalysis/WhatWillYouGetAfterAnalysis'
import WhyAIBetterThenTranslatorBlock from '../WhyAIBetterThenTranslatorBlock/WhyAIBetterThenTranslatorBlock'
import './MainPage.scss'

function MainPage() {
	return (
		<PageWrapper top bottom>
			<main className='main-page'>
				{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
				<MainPageHeader />
				<MainPageHeroImage />
				<WhyAIBetterThenTranslatorBlock />
				<WhatWillYouGetAfterAnalysis />
				<ReadAnyBookBlock />
				<WhatAboutCostBlock />
				<GoToReadingButton />
			</main>
		</PageWrapper>
	)
}

export default MainPage
