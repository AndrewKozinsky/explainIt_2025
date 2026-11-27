import type { ReactNode } from 'react'
import './ContentCardGrid.scss'

type ContentCardGridProps = {
	items: readonly {
		id: string
		title: ReactNode
		description?: ReactNode
		onClick?: () => void
	}[]
}

export default function ContentCardGrid({ items }: ContentCardGridProps) {
	return (
		<div className='content-card-grid'>
			{items.map(({ id, title, description, onClick }) => {
				const Tag = onClick ? 'button' : 'div'

				return (
					<Tag
						key={id}
						type={onClick ? 'button' : undefined}
						className='content-card-grid__card'
						onClick={onClick}
					>
						<span className='content-card-grid__title'>{title}</span>
						{description != null && <span className='content-card-grid__description'>{description}</span>}
					</Tag>
				)
			})}
		</div>
	)
}
