import type { ReactNode } from 'react'
import cn from 'classnames'
import './ContentText.scss'

type Props = {
	size?: 'middle' | 'small'
	children: ReactNode
}

export default function ContentText({ size = 'middle', children }: Props) {
	return <p className={cn('content-text', `content-text--${size}`)}>{children}</p>
}
