import type { ReactNode } from 'react'
import cn from 'classnames'
import './ContentHeaderWithChildren.scss'

type Props = {
	title: ReactNode
	hTag?: 3 | 4
	children: ReactNode
}

export default function ContentHeaderWithChildren({ title, hTag = 3, children }: Props) {
	const Tag = hTag === 3 ? 'h3' : 'h4'

	return (
		<section className={cn('content-section', `content-section--h${hTag}`)}>
			<Tag className={cn('content-section__header', `content-section__header--h${hTag}`)}>{title}</Tag>
			<div className='content-section__content'>{children}</div>
		</section>
	)
}
