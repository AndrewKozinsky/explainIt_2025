import type { ReactNode } from 'react'
import './ContentWrapper.scss'

type Props = {
	children: ReactNode
}

export default function ContentWrapper({ children }: Props) {
	return <div className='content-wrapper'>{children}</div>
}
