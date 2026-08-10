// 'use client'

// import React, { useState } from 'react'
// import Switcher, { type SwitcherItem } from '@/shared/ui/Switcher/Switcher'
// import './YouTubeVideosTabs.scss'

/*type YouTubeVideosTabsProps = {
	youtubeSlot: React.ReactNode
	savedVideosSlot: React.ReactNode
	userVideosSlot: React.ReactNode
}*/

// type TabKey = 'saved' | 'youtube' | 'user'

/*function YouTubeVideosTabs(props: YouTubeVideosTabsProps) {
	const { youtubeSlot, savedVideosSlot, userVideosSlot } = props

	const [activeTab, setActiveTab] = useState<TabKey>('saved')

	const switcherItems: SwitcherItem[] = [
		{
			text: 'Подборка',
			onClick: function () {
				setActiveTab('saved')
			},
			isCurrent: activeTab === 'saved',
		},
		{
			text: 'Поиск',
			onClick: function () {
				setActiveTab('youtube')
			},
			isCurrent: activeTab === 'youtube',
		},
		{
			text: 'Ваши видео',
			onClick: function () {
				setActiveTab('user')
			},
			isCurrent: activeTab === 'user',
		},
	]

	const tabContent = (function () {
		switch (activeTab) {
			case 'saved':
				return savedVideosSlot
			case 'youtube':
				return youtubeSlot
			case 'user':
				return userVideosSlot
		}
	})()

	return (
		<div className='youtube-videos-tabs'>
			<Switcher type='fit' orientation='horizontal' items={switcherItems} widePaddings />
			{tabContent}
		</div>
	)
}*/

// export default YouTubeVideosTabs
