import React from 'react'
import cn from 'classnames'
import './MainPageMediaCircles.scss'

type Circle = {
	accent?: boolean
	text: string
	iconUrl: string
}

type MainPageMediaCirclesProps = {
	config: Circle[]
}

function MainPageMediaCircles(props: MainPageMediaCirclesProps) {
	const { config } = props

	return (
		<div className='main-page-media-circles'>
			{config.map((circle, i) => {
				return (
					<div
						className={cn(
							'main-page-media-circles__item',
							circle.accent && 'main-page-media-circles__item--accent',
						)}
						key={i}
					>
						<span className='main-page-media-circles__star'>✦</span>
						<p className='main-page-media-circles__text'>{circle.text}</p>
						<img className='main-page-media-circles__icon' src={circle.iconUrl} alt='icon' />
					</div>
				)
			})}
		</div>
	)
}

export default MainPageMediaCircles
