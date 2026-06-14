import cn from 'classnames'
import BaseButton from 'ui/BaseButton/BaseButton'
import './Switcher.scss'

export type SwitcherItem = {
	text: string
	onClick: () => void
	isCurrent: boolean
}

type SwitcherProps = {
	type: 'fit' | 'block'
	orientation: 'horizontal' | 'vertical'
	widePaddings?: boolean
	items: SwitcherItem[]
}

function Switcher(props: SwitcherProps) {
	const { type, orientation, widePaddings, items } = props

	return (
		<div
			className={cn(
				'switcher',
				'switcher--' + orientation,
				'switcher--' + type,
				widePaddings && 'switcher--wide-paddings',
			)}
		>
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
