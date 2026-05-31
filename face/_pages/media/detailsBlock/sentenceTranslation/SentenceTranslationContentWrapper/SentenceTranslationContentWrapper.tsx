import React from 'react'
import cn from 'classnames'
import './SentenceTranslationContentWrapper.scss'

type SentenceTranslationContentWrapperProps = {
	children: React.ReactNode
	bgColor: 'white' | 'gray'
	loading: boolean
}

function SentenceTranslationContentWrapper(props: SentenceTranslationContentWrapperProps) {
	const { children, bgColor, loading } = props

	return (
		<p
			className={cn(
				'sentence-translation',
				'sentence-translation--' + bgColor,
				loading && 'sentence-translation--loading',
			)}
		>
			{children}
		</p>
	)
}

export default SentenceTranslationContentWrapper
