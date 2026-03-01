'use client'

import React from 'react'
import { useViewportSyncedHeight } from './fn/useViewportSyncedHeight'

type ViewportSyncedHeightProps = {
	minHeight?: number
	extraClass?: string
	children: React.ReactNode
}

function ViewportSyncedHeight(props: ViewportSyncedHeightProps) {
	const { minHeight = 300, extraClass, children } = props

	const { containerRef, height } = useViewportSyncedHeight({ minHeight })

	return (
		<div ref={containerRef} style={{ height, minHeight }} className={extraClass}>
			{children}
		</div>
	)
}

export default ViewportSyncedHeight
