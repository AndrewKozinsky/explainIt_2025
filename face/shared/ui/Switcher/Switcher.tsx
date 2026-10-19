import cn from 'classnames'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
import './Switcher.scss'

export type SwitcherItem = {
	text: string
	onClick: () => void
	isCurrent: boolean
}

type SwitcherProps = {
	label?: string
	type: 'fit' | 'block'
	orientation: 'horizontal' | 'vertical'
	widePaddings?: boolean
	items: SwitcherItem[]
	disabled?: boolean
}

function Switcher(props: SwitcherProps) {
	const { label, type, orientation, widePaddings, items, disabled } = props

	return (
		<LabelWithField label={label}>
			<div
				className={cn(
					'switcher',
					'switcher--' + orientation,
					'switcher--' + type,
					widePaddings && 'switcher--wide-paddings',
				)}
			>
				{items.map((item, i) => {
					return <SwitcherButton item={item} disabled={disabled} key={i} />
				})}
			</div>
		</LabelWithField>
	)
}

export default Switcher

type SwitcherButtonProps = {
	item: SwitcherItem
	disabled?: boolean
}

function SwitcherButton(props: SwitcherButtonProps) {
	const { item, disabled } = props

	return (
		<BaseButton
			extraClass={cn('switcher__button', item.isCurrent && 'switcher__button--current')}
			onClick={item.onClick}
			theme='plain'
			disabled={disabled || item.isCurrent}
		>
			{item.text}
		</BaseButton>
	)
}
