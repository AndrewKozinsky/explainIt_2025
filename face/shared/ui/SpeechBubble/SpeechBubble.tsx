import { ReactNode } from 'react'
import cn from 'classnames'
import './SpeechBubble.scss'

type SpeechBubbleProps = {
	children: ReactNode
	// Размер влияет только на внутренние отступы
	size: 'small' | 'middle'
	theme: 'dark' | 'white'
	// В какую сторону смотрит кончик в нижнем углу бабла
	tipDirection: 'left' | 'right'
	extraClass?: string
}

/** Разговорный бабл с кончиком в нижнем углу */
function SpeechBubble(props: SpeechBubbleProps) {
	const { children, size, theme, tipDirection, extraClass } = props

	return (
		<div
			className={cn(
				'speech-bubble',
				`speech-bubble--${size}`,
				`speech-bubble--${theme}`,
				`speech-bubble--tip-${tipDirection}`,
				extraClass,
			)}
		>
			{children}
			{/* Кончик нарисован смотрящим влево, вправо его отражает CSS */}
			<svg
				className='speech-bubble__tip'
				viewBox='0 0 21 24'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
			>
				<path
					d='M14.1977512,1.49887485 C14.1977512,6.60924144 14.4983534,15.3269256 20.811,23.744 C16.6025689,22.5415608 7.58450232,19.8360726 1.2718557,12.6214374 C-5.04079092,5.40680224 14.1977512,-3.61149173 14.1977512,1.49887485 Z'
					fill='currentColor'
					transform='translate(10.4055, 11.872) scale(-1, 1) translate(-10.4055, -11.872)'
				/>
			</svg>
		</div>
	)
}

export default SpeechBubble
