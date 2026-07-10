import { ReactNode } from 'react'
import cn from 'classnames'
import './Header.scss'

type HeaderProps = {
	tag: 'h2' | 'h3' | 'h4'
	children: ReactNode
}

function Header(props: HeaderProps) {
	const { tag, children } = props
	const Component = tag

	return <Component className={cn('art-header', 'art-header--' + tag)}>{children}</Component>
}

export default Header
