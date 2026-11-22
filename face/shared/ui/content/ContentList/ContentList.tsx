import type { ReactNode } from 'react'
import './ContentList.scss'

type Props = {
	size?: 'middle' | 'small'
	ordered?: boolean
	children: ReactNode
}

export default function ContentList({ size = 'middle', ordered = false, children }: Props) {
	const Tag = ordered ? 'ol' : 'ul'

	return (
		<Tag className={`content-list content-list--${ordered ? 'ordered' : 'unordered'} content-list--${size}`}>
			{children}
		</Tag>
	)
}
