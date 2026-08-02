import React from 'react'
import MediaNavigation from '@/entites/media/ui/MediaNavigation/MediaNavigation'
import OnboardingModal from '@/entites/media/ui/OnboardingModal/OnboardingModal'
import Header from '@/shared/ui/Header/Header'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import './MediaRoot.scss'

type BreadCrumbsItem = {
	name: string
	path: string
}

type MediaRootProps = {
	breadCrumbsConfig: BreadCrumbsItem[]
	header?: React.ReactNode
	subHeader?: null | string
	leftBlock: React.ReactElement
	rightBlock: React.ReactElement
	mediaNavigation?: React.ComponentProps<typeof MediaNavigation>
}

function MediaRoot(props: MediaRootProps) {
	const { breadCrumbsConfig, subHeader, header, leftBlock, rightBlock, mediaNavigation } = props

	return (
		<>
			<OnboardingModal />
			<div className='media-root'>
				<div className='media-root__header'>
					<BreadCrumbs items={breadCrumbsConfig} />
					<div className='media-root__header-row'>
						{subHeader && <p className='media-root__subheader'>{subHeader}</p>}
						{header && <Header>{header}</Header>}
					</div>
				</div>
				<div className='media-root__content'>
					<div className='reading-root__left-part'>{leftBlock}</div>
					<div className='reading-root__right-part'>{rightBlock}</div>
				</div>
				{mediaNavigation && <MediaNavigation {...mediaNavigation} />}
			</div>
		</>
	)
}

export default MediaRoot
