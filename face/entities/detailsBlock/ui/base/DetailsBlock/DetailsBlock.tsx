'use client'

import { type ReactNode, useState } from 'react'
import DetailsBlockContentWrapper from '../DetailsBlockContentWrapper/DetailsBlockContentWrapper'
import InfoViewSwitcher from '../InfoViewSwitcher/InfoViewSwitcher'
import './DetailsBlock.scss'

export type DetailsBlockTab<TabId extends string = string> = {
	id: TabId
	text: string
	icon?: ReactNode
	content: ReactNode
}

type DetailsBlockProps<TabId extends string> = {
	tabs: DetailsBlockTab<TabId>[]
	activeView?: TabId
	onViewChange?: (view: TabId) => void
}

function DetailsBlock<TabId extends string>({ tabs, activeView, onViewChange }: DetailsBlockProps<TabId>) {
	const [currentInfoView, setCurrentInfoView] = useState<TabId | undefined>(tabs[0]?.id)
	const currentTab = tabs.find((tab) => tab.id === (activeView ?? currentInfoView)) ?? tabs[0]

	if (!currentTab) return null

	return (
		<DetailsBlockContentWrapper>
			<div className='details-block-wrapper__switcher'>
				<InfoViewSwitcher
					tabs={tabs}
					currentInfoView={currentTab.id}
					setActiveInfoView={onViewChange ?? setCurrentInfoView}
				/>
			</div>
			<div className='details-block-wrapper__content'>{currentTab.content}</div>
		</DetailsBlockContentWrapper>
	)
}

export default DetailsBlock
