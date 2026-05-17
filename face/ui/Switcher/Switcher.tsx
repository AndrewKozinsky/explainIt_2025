import cn from 'classnames'
import BaseButton from 'ui/BaseButton/BaseButton'
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
		<BaseButton theme='outline' extraClass={cn('switcher__button')} onClick={item.onClick} current={item.isCurrent}>
			{item.text}
		</BaseButton>
	)
}
