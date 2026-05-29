import React, { useState } from 'react'
import LanguageSwitch from '@/ui/LanguageSwitch/LanguageSwitch'
import MediaCard from '../MediaCard/MediaCard'
import { MediaGridAddButton } from '../MediaGridAddButton/MediaGridAddButton'
import { AddMediaButtonConfig, PrivateItem, PublicItem } from '../MediaItemsGrid/types'

type MediaItemsGridWithDataProps = {
	privateItems: PrivateItem[]
	publicItems: PublicItem[]
	addMediaButtonConfig: AddMediaButtonConfig
	defaultMediaName: string
}

function MediaItemsGridWithData(props: MediaItemsGridWithDataProps) {
	const { privateItems, publicItems, addMediaButtonConfig, defaultMediaName } = props

	const languages = publicItems.map((item) => item.languageCode)
	const languagesSet = new Set(languages)

	const [currentLang, setCurrentLang] = useState(languages[0])

	return (
		<div className='media-items-grid'>
			<div className='media-items-grid__items-row'>
				{privateItems.map((item) => (
					<MediaCard type='private' key={item.url} {...item} defaultMediaName={defaultMediaName} />
				))}
				<MediaGridAddButton {...addMediaButtonConfig} />
			</div>
			<div className='media-items-grid__languages'>
				<LanguageSwitch
					languages={Array.from(languagesSet)}
					currentLang={currentLang}
					onChange={(lang) => setCurrentLang(lang)}
				/>
			</div>
			<div className='media-items-grid__items-row'>
				{publicItems
					.filter((item) => item.languageCode === currentLang)
					.map((item) => (
						<MediaCard type='public' key={item.url} {...item} defaultMediaName={defaultMediaName} />
					))}
			</div>
		</div>
	)
}

export default MediaItemsGridWithData
