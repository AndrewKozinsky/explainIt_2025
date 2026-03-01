'use client'

import { useRouter } from 'next/navigation'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import Button from '@/ui/formRelated/buttons/Button/Button'
import { useGetCoverOnClick } from '_pages/bookAndVideoCommon/PublicMediaInfo/fn/useGetCoverOnClick'
import './PublicMediaInfo.scss'

type PublicMediaInfoProps = {
	header: string
	subHeader: string
	coverUrls: string[]
	text: string
	contentType: 'book' | 'video'
	mediaUrl: string
}

export default function PublicMediaInfo(props: PublicMediaInfoProps) {
	const { header, subHeader, coverUrls, text, contentType, mediaUrl } = props
	const { activeCoverIndex, handleCoverClick } = useGetCoverOnClick(coverUrls)

	return (
		<div className='public-media-info'>
			<div className='public-media-info__cover'>
				<div className='public-media-info__cover-text'>
					<p className='public-media-info__cover-sub-header'>{subHeader}</p>
					<h3 className='public-media-info__cover-header'>{header}</h3>
				</div>
				<div className='public-media-info__cover-image' onClick={handleCoverClick}>
					{!!coverUrls.length && (
						<img
							className='public-media-info__cover-image-img'
							src={coverUrls[activeCoverIndex]}
							alt={header}
						/>
					)}
				</div>
			</div>
			<PublicMediaInfoText text={text} />
			<PublicMediaInfoActions contentType={contentType} mediaUrl={mediaUrl} />
		</div>
	)
}

type PublicMediaInfoTextProps = {
	text: string
}

function PublicMediaInfoText(props: PublicMediaInfoTextProps) {
	const { text } = props
	const paragraphs = text.split(/\r?\n+/).filter((paragraph) => paragraph.trim().length)

	return (
		<div className='public-media-info__text'>
			{paragraphs.map((paragraph, index) => (
				<p key={index}>{paragraph}</p>
			))}
		</div>
	)
}

type PublicMediaInfoActionsProps = {
	contentType: 'book' | 'video'
	mediaUrl: string
}

function PublicMediaInfoActions(props: PublicMediaInfoActionsProps) {
	const { contentType, mediaUrl } = props

	const router = useRouter()
	const actionLabel = contentType === 'book' ? 'Читать' : 'Смотреть'

	function handleActionClick() {
		router.push(mediaUrl)
	}

	return (
		<div className='public-media-info__actions'>
			<Button onClick={handleActionClick} icon={publicFolderFilesUrls.icons.actionButtonIcon}>
				{actionLabel}
			</Button>
		</div>
	)
}
