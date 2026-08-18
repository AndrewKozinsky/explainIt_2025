import React from 'react'
import './ItemsGrid.scss'

type MediaItemsGridWithDataProps = {
	children: React.ReactNode[]
	size?: 'small' | 'medium'
}

function ItemsGrid(props: MediaItemsGridWithDataProps) {
	const { children, size = 'medium' } = props

	return (
		<div className={`items-grid items-grid--${size}`}>
			{children.map((item, index) => (
				<React.Fragment key={index}>{item}</React.Fragment>
			))}
		</div>
	)
}

export default ItemsGrid
