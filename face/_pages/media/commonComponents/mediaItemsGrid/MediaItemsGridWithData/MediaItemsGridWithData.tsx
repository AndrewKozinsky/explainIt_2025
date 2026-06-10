import React, { useState } from 'react'
import ItemsGrid from 'ui/ItemsGrid/ItemsGrid'
import LanguageSwitch from '@/ui/LanguageSwitch/LanguageSwitch'
import MediaCard from '../MediaCard/MediaCard'
import { MediaGridAddButton } from '../MediaGridAddButton/MediaGridAddButton'
import { AddMediaButtonConfig, PrivateItem, PublicItem } from '../MediaItemsGrid/types'
import './MediaItemsGridWithData.scss'

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

	const privateItemsWithAddButton = [
		...privateItems.map((item) => (
			<MediaCard type='private' key={item.url} {...item} defaultMediaName={defaultMediaName} />
		)),
		<MediaGridAddButton {...addMediaButtonConfig} />,
	]

	return (
		<div className='media-items-grid'>
			<ItemsGrid>{privateItemsWithAddButton}</ItemsGrid>
			<div className='media-items-grid__languages'>
				<LanguageSwitch
					languages={Array.from(languagesSet)}
					currentLang={currentLang}
					onChange={(lang) => setCurrentLang(lang)}
				/>
			</div>
			<ItemsGrid>
				{publicItems
					.filter((item) => item.languageCode === currentLang)
					.map((item) => (
						<MediaCard type='public' key={item.url} {...item} defaultMediaName={defaultMediaName} />
					))}
			</ItemsGrid>
		</div>
	)
}

export default MediaItemsGridWithData
