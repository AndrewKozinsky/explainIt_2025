import React from 'react'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import Spinner from 'ui/Spinner/Spinner'
import MediaItemsGridWithData from './MediaItemsGridWithData'
import { AddMediaButtonConfig, MediaItemsGridConfig } from './types'
import './MediaItemsGrid.scss'

export type MediaItemsGridProps = {
	loading: boolean
	error: null | string
	config: null | MediaItemsGridConfig
	addMediaButtonConfig: AddMediaButtonConfig
	defaultMediaName: string
}

function MediaItemsGrid(props: MediaItemsGridProps) {
	const { loading, error, config, addMediaButtonConfig, defaultMediaName } = props

	if (loading) {
		return <Spinner size='small' />
	}

	if (error) {
		return <ErrorMessage text={error} />
	}

	if (!config?.publicItems || !config?.privateItems) {
		return null
	}

	return (
		<MediaItemsGridWithData
			privateItems={config?.privateItems || []}
			publicItems={config?.publicItems || []}
			addMediaButtonConfig={addMediaButtonConfig}
			defaultMediaName={defaultMediaName}
		/>
	)
}

export default MediaItemsGrid
