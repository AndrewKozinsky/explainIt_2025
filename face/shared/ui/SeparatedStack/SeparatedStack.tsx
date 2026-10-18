import { Children, Fragment, isValidElement, type ReactNode } from 'react'
import cn from 'classnames'
import './SeparatedStack.scss'

type SeparatedStackProps = {
	children: ReactNode
	extraClass?: string
}

/** Располагает дочерние элементы вертикально, добавляя между ними разделители высотой 1 px. */
function SeparatedStack({ children, extraClass }: SeparatedStackProps) {
	const items = Children.toArray(children)

	return (
		<div className={cn('separated-stack', extraClass)}>
			{items.map((child, index) => (
				<Fragment key={isValidElement(child) ? child.key : index}>
					{index > 0 && <div className='separated-stack__divider' />}
					{child}
				</Fragment>
			))}
		</div>
	)
}

export default SeparatedStack
