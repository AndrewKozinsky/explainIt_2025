import React from 'react'
import Header from 'ui/Header/Header'
import { useGetPageHeader } from './fn/useGetPageHeader'

function VideosHeader() {
	return <Header>{useGetPageHeader()}</Header>
}

export default VideosHeader
