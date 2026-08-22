'use client'

import React from 'react'
import cn from 'classnames'
import { useViewportSyncedHeight } from './fn/useViewportSyncedHeight'
import './ViewportSyncedHeight.scss'

type ViewportSyncedHeightProps = {
	minHeight?: number
	/** Отступ от верхнего края экрана */
	gapTop?: number
	/** Отступ от нижнего края экрана */
	gapBottom?: number
	extraClass?: string
	children: React.ReactNode
}

/**
 * Задаёт вложенным элементам максимально доступную высоту: пересечение отведённого места в вёрстке
 * с видимой частью экрана. Родитель должен иметь position: relative.
 */
function ViewportSyncedHeight(props: ViewportSyncedHeightProps) {
	const { minHeight = 200, gapTop = 0, gapBottom = 0, extraClass, children } = props

	const { trackRef, containerRef } = useViewportSyncedHeight({ minHeight, gapTop, gapBottom })

	return (
		<div ref={trackRef} className='viewport-synced-height'>
			<div
				ref={containerRef}
				style={{ top: gapTop, minHeight }}
				className={cn('viewport-synced-height__container', extraClass)}
			>
				{children}
			</div>
		</div>
	)
}

export default ViewportSyncedHeight
