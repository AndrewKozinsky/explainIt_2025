import { type ReactNode, useId } from 'react'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import './ContentCardGrid.scss'

type ContentCardGridProps = {
	items: readonly {
		id: string
		title: ReactNode
		description?: ReactNode
		onClick?: () => void
		selected?: boolean
	}[]
}

export default function ContentCardGrid({ items }: ContentCardGridProps) {
	const gridId = useId()

	return (
		<div className='content-card-grid'>
			{items.map(({ id, title, description, onClick, selected }, index) => {
				const titleId = `${gridId}-title-${index}`
				const descriptionId = description != null ? `${gridId}-description-${index}` : undefined
				const content = (
					<ContentCardBody
						title={title}
						titleId={titleId}
						description={description}
						descriptionId={descriptionId}
					/>
				)

				if (selected || !onClick) {
					return (
						<div key={id} className='content-card-grid__card' aria-current={selected || undefined}>
							{content}
						</div>
					)
				}

				return (
					<BaseButton
						key={id}
						theme='outline'
						extraClass='content-card-grid__card'
						onClick={onClick}
						aria-labelledby={titleId}
						aria-describedby={descriptionId}
					>
						{content}
					</BaseButton>
				)
			})}
		</div>
	)
}

type ContentCardBodyProps = {
	title: ReactNode
	titleId: string
	description?: ReactNode
	descriptionId?: string
}

function ContentCardBody({ title, titleId, description, descriptionId }: ContentCardBodyProps) {
	return (
		<>
			<span id={titleId} className='content-card-grid__title'>
				{title}
			</span>
			{descriptionId && (
				<span id={descriptionId} className='content-card-grid__description'>
					{description}
				</span>
			)}
		</>
	)
}
