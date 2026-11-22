import type { ReactNode } from 'react'
import './ContentBordered.scss'

type Props = {
	children: ReactNode
}

export default function ContentBordered({ children }: Props) {
	return <div className='content-bordered'>{children}</div>
}
