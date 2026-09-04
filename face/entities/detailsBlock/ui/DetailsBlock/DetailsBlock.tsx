'use client'

import { useState, type ReactNode } from 'react'
import DetailsBlockContentWrapper from '../base/DetailsBlockContentWrapper/DetailsBlockContentWrapper'
import InfoViewSwitcher from '../InfoViewSwitcher'
import './DetailsBlock.scss'

export type InfoViewType = 'dictionary' | 'words' | 'ai_dialog'

export type DetailsBlockTab = {
	type: InfoViewType
	text: string
	content: ReactNode
}

type DetailsBlockProps = {
	tabs: [DetailsBlockTab, ...DetailsBlockTab[]]
}

function DetailsBlock({ tabs }: DetailsBlockProps) {
	const [currentInfoView, setCurrentInfoView] = useState<InfoViewType>(tabs[0].type)
	const currentTab = tabs.find((tab) => tab.type === currentInfoView) ?? tabs[0]

	return (
		<DetailsBlockContentWrapper>
			<div className='details-block-wrapper__switcher'>
				<InfoViewSwitcher
					tabs={tabs}
					currentInfoView={currentTab.type}
					setActiveInfoView={setCurrentInfoView}
				/>
			</div>
			<div className='details-block-wrapper__content'>{currentTab.content}</div>
		</DetailsBlockContentWrapper>
	)
}

export default DetailsBlock
