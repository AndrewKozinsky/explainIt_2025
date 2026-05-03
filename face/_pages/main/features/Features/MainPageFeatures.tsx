'use client'

import MainPageFeature from '../MainPageFeature/MainPageFeature'
import featuresConfig from './fn/featuresConfig'
import { useMainPageFeatures } from './fn/useMainPageFeatures'
import './MainPageFeatures.scss'

function MainPageFeatures() {
	const { containerRef, activeIndex } = useMainPageFeatures()

	return (
		<section className='main-page-features' ref={containerRef}>
			<div className='main-page-features__sticky-wrapper'>
				<div className='main-page-features__content'>
					<div className='main-page-features__list'>
						{featuresConfig.map((feature, index) => (
							<MainPageFeature
								key={feature.name}
								feature={feature}
								index={index}
								activeIndex={activeIndex}
							/>
						))}
					</div>
					<div className='main-page-features__video-container'>
						{featuresConfig.map((feature, index) => (
							<video
								key={feature.videoUrl}
								src={feature.videoUrl}
								muted
								loop
								playsInline
								autoPlay
								className={`main-page-features__video ${index === activeIndex ? 'main-page-features__video--visible' : ''}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default MainPageFeatures
