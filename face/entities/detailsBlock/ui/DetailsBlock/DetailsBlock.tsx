'use client'

import type { ReactNode } from 'react'
import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'

type DetailsBlockProps = {
	bottomElem?: ReactNode
}

function DetailsBlock(props: DetailsBlockProps) {
	const { bottomElem } = props

	return (
		<ViewportSyncedHeight extraClass='details-block' gapTop={10} gapBottom={10}>
			{bottomElem}
		</ViewportSyncedHeight>
	)
}

export default DetailsBlock
