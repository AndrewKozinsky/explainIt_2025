import React from 'react'
import cn from 'classnames'
import './Switcher.scss'

export type SwitcherItem = {
	text: string
	onClick: () => void
	isCurrent: boolean
}

type SwitcherProps = {
	orientation: 'horizontal' | 'vertical'
	items: SwitcherItem[]
}

function Switcher(props: SwitcherProps) {
	const { orientation, items } = props

	return (
		<div className={cn('switcher', 'switcher--' + orientation)}>
			{items.map((item, i) => {
				return <SwitcherButton item={item} key={i} />
			})}
		</div>
	)
}

export default Switcher

type SwitcherButtonProps = {
	item: SwitcherItem
}

function SwitcherButton(props: SwitcherButtonProps) {
	const { item } = props

	return (
		<button
			className={cn('switcher__button', item.isCurrent && 'switcher__button--current')}
			onClick={item.onClick}
		>
			{item.text}
		</button>
	)
}
