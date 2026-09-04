'use client'

import type { ReactNode } from 'react'
import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'
import DetailsBlockWrapper from '../ViewRouter/DetailsBlockWrapper'
import './DetailsBlock.scss'

type DetailsBlockProps = {
	sentenceId: null | number
	bottomElem?: ReactNode
}

function DetailsBlock(props: DetailsBlockProps) {
	const { sentenceId, bottomElem } = props

	return (
		<ViewportSyncedHeight extraClass='details-block' gapTop={10} gapBottom={10}>
			<DetailsBlockWrapper sentenceId={sentenceId} />
			{bottomElem}
		</ViewportSyncedHeight>
	)
}

export default DetailsBlock
