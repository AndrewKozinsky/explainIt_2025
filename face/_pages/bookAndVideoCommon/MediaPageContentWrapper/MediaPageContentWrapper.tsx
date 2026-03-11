import { ReactNode } from 'react'
import Header from 'ui/Header/Header'
import './MediaPageContentWrapper.scss'

type MediaPageContentWrapperProps = {
	breadCrumbs: ReactNode
	header: string
	subHeader?: string
	children: ReactNode
}

function MediaPageContentWrapper(props: MediaPageContentWrapperProps) {
	const { breadCrumbs, header, subHeader, children } = props

	return (
		<article className='media-page-content-wrapper'>
			<div className='media-page-content-wrapper__top'>
				{breadCrumbs}
				<div className='media-page-content-wrapper__header'>
					{subHeader && <p>{subHeader}</p>}
					<Header>{header}</Header>
				</div>
			</div>
			<div className='media-page-content-wrapper__content'>{children}</div>
		</article>
	)
}

export default MediaPageContentWrapper
