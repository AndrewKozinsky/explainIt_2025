import cn from 'classnames'
import { ButtonIconProps } from '@/shared/ui/icons/buttonIcons/standard/buttonProps'
import './LoadingSmallButtonIcon.scss'

export function LoadingSmallButtonIcon({ extraClass }: ButtonIconProps) {
	return <span className={cn('loading-small-button-icon', extraClass)} aria-hidden='true' />
}
