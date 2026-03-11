import React, { useState } from 'react'
import { AddButton } from './AddButton'
import LanguageSwitch from './LanguageSwitch'
import MediaCard from './MediaCard'
import { AddMediaButtonConfig, PrivateItem, PublicItem } from './types'

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
					<MediaCard key={item.url} {...item} defaultMediaName={defaultMediaName} />
				))}
				<AddButton {...addMediaButtonConfig} />
			</div>
			<LanguageSwitch languagesSet={languagesSet} currentLang={currentLang} setCurrentLang={setCurrentLang} />
			<div className='media-items-grid__items-row'>
				{publicItems
					.filter((item) => item.languageCode === currentLang)
					.map((item) => (
						<MediaCard key={item.url} {...item} defaultMediaName={defaultMediaName} />
					))}
			</div>
		</div>
	)
}

export default MediaItemsGridWithData
