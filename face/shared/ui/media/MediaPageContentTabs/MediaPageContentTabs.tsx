'use client'

import React, { useLayoutEffect, useState } from 'react'
import Switcher, { type SwitcherItem } from '@/shared/ui/Switcher/Switcher'
import './MediaPageContentTabs.scss'

export type TabConfig = {
	key: string
	label: string
	content: React.ReactNode
}

type MediaPageContentTabsProps = {
	tabs: TabConfig[]
	defaultTab?: string
	onTabChange?: (tabKey: string) => void
}

function MediaPageContentTabs(props: MediaPageContentTabsProps) {
	const { tabs, defaultTab, onTabChange } = props

	const [activeTab, setActiveTab] = useState<string>(defaultTab ?? tabs[0]?.key ?? '')

	useLayoutEffect(() => {
		if (defaultTab) {
			setActiveTab(defaultTab)
		}
	}, [defaultTab])

	const switcherItems: SwitcherItem[] = tabs.map((tab) => ({
		text: tab.label,
		onClick: function () {
			setActiveTab(tab.key)
			onTabChange?.(tab.key)
		},
		isCurrent: activeTab === tab.key,
	}))

	const tabContent = tabs.find((tab) => tab.key === activeTab)?.content ?? null

	return (
		<div className='media-page-content-tabs'>
			<Switcher type='fit' orientation='horizontal' items={switcherItems} widePaddings />
			{tabContent}
		</div>
	)
}

export default MediaPageContentTabs
