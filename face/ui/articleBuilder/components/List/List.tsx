import cn from 'classnames'
import { ReactNode } from 'react'
import './List.scss'

type ListProps = {
	listType: 'dots' | 'numbers'
	children: ReactNode
}

function List(props: ListProps) {
	const { listType, children } = props
	const Component = listType === 'dots' ? 'ul' : 'ol'

	return <Component className={cn('art-list')}>{children}</Component>
}

export default List
