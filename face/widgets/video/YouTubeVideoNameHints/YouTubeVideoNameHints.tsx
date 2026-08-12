import React from 'react'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import './YouTubeVideoNameHints.scss'

function YouTubeVideoNameHints() {
	return (
		<div className='you-tube-video-name-hints'>
			<HintButton>How I Practice English Every Day</HintButton>
			<HintButton>First Impressions of MOSCOW</HintButton>
			<HintButton>How I Got My American Accent</HintButton>
			<HintButton>Daily Life English</HintButton>
		</div>
	)
}

export default YouTubeVideoNameHints

function HintButton({ children }: { children: string }) {
	return (
		<Button theme='outline' size='small'>
			{children}
		</Button>
	)
}
