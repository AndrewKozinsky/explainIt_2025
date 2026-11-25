import cn from 'classnames'
import './CheckMarkIcon.scss'

type CheckMarkIconProps = {
	extraClass?: string
}

export function CheckMarkIcon({ extraClass }: CheckMarkIconProps) {
	return <span className={cn('check-mark-icon', extraClass)} aria-hidden='true' />
}
