import React from 'react'
import Header from 'ui/Header/Header'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import './MediaPageHeader.scss'

type BreadCrumbsItem = {
	name: string
	path: string
}

type MediaPageHeaderProps = {
	header?: React.ReactNode
	chapterNumber?: string
	breadCrumbsItems: BreadCrumbsItem[]
}

function MediaPageHeader(props: MediaPageHeaderProps) {
	const { breadCrumbsItems, chapterNumber, header } = props

	return (
		<div className='media-page-header'>
			<BreadCrumbs items={breadCrumbsItems} />
			<div className='media-page-header__header-row'>
				{chapterNumber && <p className='media-page-header__chapter-number'>{chapterNumber}</p>}
				{header && <Header>{header}</Header>}
			</div>
		</div>
	)
}

export default MediaPageHeader
