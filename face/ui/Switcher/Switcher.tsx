import React from 'react'
import cn from 'classnames'
import s from './Switcher.module.scss'

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
		<div className={(s.wrapper, s['wrapper--' + orientation])}>
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
		<button className={cn(s.button, item.isCurrent && s['button--current'])} onClick={item.onClick}>
			{item.text}
		</button>
	)
}
