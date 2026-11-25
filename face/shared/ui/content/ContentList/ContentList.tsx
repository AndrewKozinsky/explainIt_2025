import { Children, cloneElement, Fragment, isValidElement, type ReactNode } from 'react'
import { CheckMarkIcon } from '@/shared/ui/icons/common/CheckMarkIcon'
import './ContentList.scss'

type Props = {
	size?: 'middle' | 'small'
	type?: 'numbers' | 'dots' | 'checkMarks'
	children: ReactNode
}

export default function ContentList({ size = 'middle', type = 'dots', children }: Props) {
	const Tag = type === 'numbers' ? 'ol' : 'ul'
	const hasCheckMarks = type === 'checkMarks'

	return (
		<Tag
			className={`content-list content-list--${type} content-list--${size}`}
			role={hasCheckMarks ? 'list' : undefined}
		>
			{hasCheckMarks ? addCheckMarks(children) : children}
		</Tag>
	)
}

function addCheckMarks(children: ReactNode): ReactNode {
	return Children.map(children, (child) => {
		if (!isValidElement<{ children?: ReactNode }>(child)) {
			return child
		}

		if (child.type === Fragment) {
			return cloneElement(child, undefined, addCheckMarks(child.props.children))
		}

		if (child.type !== 'li') {
			return child
		}

		return cloneElement(
			child,
			undefined,
			<>
				<CheckMarkIcon extraClass='content-list__check-mark' />
				{child.props.children}
			</>,
		)
	})
}
