import React, { ReactNode } from 'react'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import Spinner from '@/shared/ui/Spinner/Spinner'
import MediaItemsGridWithData from '../MediaItemsGridWithData/MediaItemsGridWithData'
import { MediaItemsGridConfig } from './types'

export type MediaItemsGridProps = {
	loading: boolean
	error: null | string
	config: null | MediaItemsGridConfig
	addButton: ReactNode
	defaultMediaName: string
}

function MediaItemsGrid(props: MediaItemsGridProps) {
	const { loading, error, config, addButton, defaultMediaName } = props

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
			addButton={addButton}
			defaultMediaName={defaultMediaName}
		/>
	)
}

export default MediaItemsGrid
