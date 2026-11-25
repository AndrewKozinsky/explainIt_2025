import type { ReactNode } from 'react'
import './ContentList.scss'

type Props = {
	size?: 'middle' | 'small'
	type?: 'numbers' | 'dots' | 'checkMarks'
	children: ReactNode
}

export default function ContentList({ size = 'middle', type = 'dots', children }: Props) {
	const Tag = type === 'numbers' ? 'ol' : 'ul'

	return (
		<Tag
			className={`content-list content-list--${type} content-list--${size}`}
			role={type === 'checkMarks' ? 'list' : undefined}
		>
			{children}
		</Tag>
	)
}
