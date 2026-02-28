import React, { RefObject } from 'react'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import Spinner from 'ui/Spinner/Spinner'
import './RootSurface.scss'

type RootSurfaceProps = {
	loading: boolean
	error: null | string
	children: React.ReactNode
	rootRef?: RefObject<HTMLDivElement | null>
}

function RootSurface(props: RootSurfaceProps) {
	const { loading, error, children, rootRef } = props

	return (
		<div className='root-surface' ref={rootRef}>
			{loading && !error && <Spinner size='small' />}
			{error && <ErrorMessage text={error} />}
			{!loading && !error && children}
		</div>
	)
}

export default RootSurface
