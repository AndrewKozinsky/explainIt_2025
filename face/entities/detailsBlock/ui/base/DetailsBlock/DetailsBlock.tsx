'use client'

import { type ReactNode, useState } from 'react'
import DetailsBlockContentWrapper from '../DetailsBlockContentWrapper/DetailsBlockContentWrapper'
import InfoViewSwitcher from '../InfoViewSwitcher/InfoViewSwitcher'
import './DetailsBlock.scss'

export type InfoViewType = 'dictionary' | 'words' | 'ai_dialog' | 'message' | 'settings'

export type DetailsBlockTab = {
	type: InfoViewType
	text: string
	content: ReactNode
}

type DetailsBlockProps = {
	tabs: [DetailsBlockTab, ...DetailsBlockTab[]]
	activeView?: InfoViewType
	onViewChange?: (view: InfoViewType) => void
}

function DetailsBlock({ tabs, activeView, onViewChange }: DetailsBlockProps) {
	const [currentInfoView, setCurrentInfoView] = useState<InfoViewType>(tabs[0].type)
	const currentTab = tabs.find((tab) => tab.type === (activeView ?? currentInfoView)) ?? tabs[0]

	return (
		<DetailsBlockContentWrapper>
			<div className='details-block-wrapper__switcher'>
				<InfoViewSwitcher
					tabs={tabs}
					currentInfoView={currentTab.type}
					setActiveInfoView={onViewChange ?? setCurrentInfoView}
				/>
			</div>
			<div className='details-block-wrapper__content'>{currentTab.content}</div>
		</DetailsBlockContentWrapper>
	)
}

export default DetailsBlock
