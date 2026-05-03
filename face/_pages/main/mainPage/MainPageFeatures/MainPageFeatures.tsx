'use client'

import { useEffect, useRef, useState } from 'react'
import featuresConfig from './fn/featuresConfig'
import './MainPageFeatures.scss'

function MainPageFeatures() {
	const containerRef = useRef<HTMLDivElement>(null)
	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current) return

			const rect = containerRef.current.getBoundingClientRect()
			const containerHeight = rect.height
			const scrollOffset = -rect.top // How much is scrolled past the top of the container

			if (scrollOffset < 0) {
				setActiveIndex(0)
				return
			}

			const scrollRange = containerHeight - window.innerHeight
			const progress = scrollOffset / scrollRange
			const rawIndex = Math.floor(progress * featuresConfig.length)
			const index = Math.min(featuresConfig.length - 1, Math.max(0, rawIndex))

			setActiveIndex(index)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])
	return (
		<section className='main-page-features' ref={containerRef}>
			<div className='main-page-features__sticky-wrapper'>
				<div className='main-page-features__content'>
					<div className='main-page-features__list'>
						{featuresConfig.map((feature, index) => (
							<div
								key={feature.name}
								className={`main-page-features__item ${index === activeIndex ? 'main-page-features__item--active' : ''}`}
							>
								<span className='main-page-features__item-number'>
									{String(index + 1).padStart(2, '0')}
								</span>
								<span className='main-page-features__item-name'>{feature.name}</span>
							</div>
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
