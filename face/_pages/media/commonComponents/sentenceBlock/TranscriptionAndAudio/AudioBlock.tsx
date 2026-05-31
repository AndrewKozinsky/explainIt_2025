// import React from 'react'
// import { ErrorIcon } from 'ui/icons/ErrorIcon'
// import Spinner from 'ui/Spinner/Spinner'
// import { AudioData } from './fn/types'

/*type AudioIconProps = {
	audio: AudioData
	isPlaying: boolean
}*/

/*export function AudioIcon(props: AudioIconProps) {
	const { audio, isPlaying } = props

	// Show spinner while loading audio
	if (audio.status === 'loading') {
		return <Spinner size='extra-small' />
	}

	// Show error if audio failed to load
	if (audio.status === 'error') {
		return <ErrorIcon extraClass='transcription-audio__error-icon' />
	}

	return <span className='transcription-audio__icon-wrapper'>{isPlaying ? <PauseIcon /> : <PlayIcon />}</span>
}*/

/*function PlayIcon() {
	return (
		<svg
			width='10px'
			height='11px'
			viewBox='0 0 10 11'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
		>
			<g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
				<path
					d='M0.647,1.77565334 L0.647,9.22434666 C0.647,9.77663141 1.09471525,10.2243467 1.647,10.2243467 C1.82979762,10.2243467 2.00909833,10.1742413 2.16541402,10.0794764 L8.30876581,6.35512976 C8.78104094,6.06881761 8.93179371,5.45386111 8.64548156,4.98158598 C8.56199358,4.84387163 8.44648017,4.72835821 8.30876581,4.64487024 L2.16541402,0.920523577 C1.69313889,0.634211422 1.07818239,0.784964197 0.791870239,1.25723932 C0.697105392,1.413555 0.647,1.59285572 0.647,1.77565334 Z'
					fill='#1E1E1E'
				></path>
			</g>
		</svg>
	)
}*/

/*function PauseIcon() {
	return (
		<svg
			width='10px'
			height='11px'
			viewBox='0 0 10 11'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
		>
			<g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
				<path
					d='M2,0 L3,0 C3.55228475,0 4,0.44771525 4,1 L4,10 C4,10.5522847 3.55228475,11 3,11 L2,11 C1.44771525,11 1,10.5522847 1,10 L1,1 C1,0.44771525 1.44771525,0 2,0 Z'
					fill='#282316'
				></path>
				<path
					d='M8,0 L9,0 C9.55228475,0 10,0.44771525 10,1 L10,10 C10,10.5522847 9.55228475,11 9,11 L8,11 C7.44771525,11 7,10.5522847 7,10 L7,1 C7,0.44771525 7.44771525,0 8,0 Z'
					fill='#282316'
				></path>
			</g>
		</svg>
	)
}*/
