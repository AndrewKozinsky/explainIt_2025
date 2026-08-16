import React from 'react'
import './ItemsGrid.scss'

type MediaItemsGridWithDataProps = {
	children: React.ReactNode[]
}

function ItemsGrid(props: MediaItemsGridWithDataProps) {
	const { children } = props

	return (
		<div className='items-grid'>
			{children.map((item, index) => (
				<React.Fragment key={index}>{item}</React.Fragment>
			))}
		</div>
	)
}

export default ItemsGrid
