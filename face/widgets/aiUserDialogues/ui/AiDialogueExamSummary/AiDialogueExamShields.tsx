import './AiDialogueExamShields.scss'

const shieldPath =
	'M27.4 1.2a5 5 0 0 1 3.2 0l25 8a2.5 2.5 0 0 1 1.9 2.5V39c0 15.5-9.6 27-27.6 36.1a2 2 0 0 1-1.8 0C10.1 66 .5 54.5 .5 39V11.7a2.5 2.5 0 0 1 1.9-2.5Z'

export function AiDialogueExamInProgressShield() {
	return (
		<svg className='ai-dialogue-exam-shield' viewBox='0 0 58 76' aria-hidden='true'>
			<path d={shieldPath} fill='none' stroke='currentColor' />
		</svg>
	)
}

export function AiDialogueExamFailedShield() {
	return (
		<svg className='ai-dialogue-exam-shield' viewBox='0 0 58 76' aria-hidden='true'>
			<path d={shieldPath} fill='currentColor' stroke='currentColor' />
			<path
				className='ai-dialogue-exam-shield__mark'
				d='m19 28 20 20m0-20L19 48'
				stroke='white'
				strokeLinecap='round'
			/>
		</svg>
	)
}
