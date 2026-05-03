import React from 'react'
import './MainPageFeature.scss'

interface MainPageFeatureItemProps {
	feature: {
		name: string
	}
	index: number
	activeIndex: number
}

const MainPageFeature: React.FC<MainPageFeatureItemProps> = ({ feature, index, activeIndex }) => {
	return (
		<div
			key={feature.name}
			className={`main-page-feature ${index === activeIndex ? 'main-page-feature--active' : ''}`}
		>
			<p className='main-page-feature__number'>{String(index + 1).padStart(2, '0')}</p>
			<p className='main-page-feature__name'>{feature.name}</p>
		</div>
	)
}

export default MainPageFeature
