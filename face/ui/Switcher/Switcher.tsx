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
	dataButtonTestId?: string
}

function Switcher(props: SwitcherProps) {
	const { orientation, items, dataButtonTestId } = props

	return (
		<div className={cn('switcher', 'switcher--' + orientation)}>
			{items.map((item, i) => {
				return <SwitcherButton item={item} dataTestId={dataButtonTestId} key={i} />
			})}
		</div>
	)
}

export default Switcher

type SwitcherButtonProps = {
	item: SwitcherItem
	dataTestId?: string
}

function SwitcherButton(props: SwitcherButtonProps) {
	const { item, dataTestId } = props

	return (
		<button
			className={cn('switcher__button', item.isCurrent && 'switcher__button--current')}
			onClick={item.onClick}
			data-testid={dataTestId}
		>
			{item.text}
		</button>
	)
}
