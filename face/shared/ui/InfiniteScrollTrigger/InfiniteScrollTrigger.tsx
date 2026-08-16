'use client'

import cn from 'classnames'
import Spinner from '@/shared/ui/Spinner/Spinner'
import { useInfiniteScrollTrigger } from './fn/useInfiniteScrollTrigger'
import './InfiniteScrollTrigger.scss'

type InfiniteScrollTriggerProps = {
	/** Вызывается, когда триггер попал в зону видимости и enabled === true */
	onTrigger: () => void
	/** Разрешает отслеживание и вызов onTrigger */
	enabled: boolean
	/** Показывать спиннер (идёт догрузка) */
	isLoading?: boolean
	/** Дополнительные CSS-классы */
	extraClass?: string
}

/**
 * Сентинел в конце списка: когда он приближается к низу экрана,
 * вызывает onTrigger для подгрузки следующей страницы.
 */
function InfiniteScrollTrigger(props: InfiniteScrollTriggerProps) {
	const { onTrigger, enabled, isLoading = false, extraClass } = props

	const triggerRef = useInfiniteScrollTrigger({ onTrigger, enabled })

	if (!enabled && !isLoading) {
		return null
	}

	return (
		<div ref={triggerRef} className={cn('infinite-scroll-trigger', extraClass)}>
			{isLoading ? <Spinner size='small' /> : null}
		</div>
	)
}

export default InfiniteScrollTrigger
