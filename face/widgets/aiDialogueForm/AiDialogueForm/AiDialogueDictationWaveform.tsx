import { useEffect, useRef, useState } from 'react'
import { observeDictationWaveform } from './fn/observeDictationWaveform'

const BAR_STEP = 3.5

/** Starts with one bar and fills the available space with recording history. */
export function AiDialogueDictationWaveform({ stream }: { stream?: MediaStream }) {
	const svgRef = useRef<SVGSVGElement>(null)
	const capacityRef = useRef(40)
	const [width, setWidth] = useState(140)
	const [levels, setLevels] = useState([0])

	useEffect(() => {
		const svg = svgRef.current
		if (!svg) return

		const observer = new ResizeObserver(([entry]) => {
			const width = entry.contentRect.width
			capacityRef.current = Math.max(1, Math.floor(width / BAR_STEP))
			setWidth(width)
			setLevels((previous) => previous.slice(-capacityRef.current))
		})
		observer.observe(svg)

		return () => observer.disconnect()
	}, [])

	useEffect(
		() =>
			observeDictationWaveform(stream, (level) => {
				setLevels((previous) => [...previous, level].slice(-capacityRef.current))
			}),
		[stream],
	)

	return (
		<svg
			ref={svgRef}
			className='ai-dialogue-input__waveform'
			viewBox={`0 0 ${Math.max(1, width)} 38`}
			height={38}
			aria-hidden='true'
		>
			{levels.map((level, index) => {
				const height = Math.max(2, level * 36)
				// Paths are excluded from the app's global `all: unset` reset.
				return (
					<path
						key={index}
						d={`M${Math.max(1, width) - 1.5 - (levels.length - 1 - index) * BAR_STEP} ${(38 - height) / 2}v${height}`}
						stroke='currentColor'
						strokeWidth={1.5}
						strokeLinecap='round'
					/>
				)
			})}
		</svg>
	)
}
