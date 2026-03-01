import React from 'react'
import './MainPageMediaCovers.scss'

type Cover = {
	url: string
	level: string
}
//
type MainPageMediaCoversProps = {
	covers: Cover[]
}

function MainPageMediaCovers(props: MainPageMediaCoversProps) {
	const { covers } = props

	return (
		<div className='main-page-media-covers'>
			{covers.map((cover, i) => {
				return (
					<div className='main-page-media-covers__item' key={i}>
						<div
							className='main-page-media-covers__cover-wrap'
							style={{ '--bg-url': `url("${'/' + cover.url}")` } as React.CSSProperties}
						>
							<img
								srcSet={cover.url + ' 2x'}
								className='main-page-media-covers__cover'
								alt={cover.level}
							/>
						</div>
						<p className='main-page-media-covers__level'>{cover.level}</p>
					</div>
				)
			})}
		</div>
	)
}

export default MainPageMediaCovers
