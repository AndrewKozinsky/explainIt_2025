'use client'

import { useRef } from 'react'
import cn from 'classnames'
import { getCloudPath } from './fn/getCloudPath'
import { useElementSize } from './fn/useElementSize'
import './ThoughtBox.scss'

type ThoughtBoxProps = {
	label: string
	text: string
	// Класс кружков, ведущих от облака к голове персонажа: через него шаг решает, показывать ли их
	tailExtraClass?: string
}

/** Мысль персонажа в облачке, как в комиксах: подпись и сама мысль */
function ThoughtBox(props: ThoughtBoxProps) {
	const { label, text, tailExtraClass } = props

	const boxRef = useRef<HTMLDivElement>(null)
	const size = useElementSize(boxRef)

	return (
		<div className={cn('any-level-thought-box', !size && 'any-level-thought-box--unmeasured')} ref={boxRef}>
			{/* Облако строится по размеру блока, поэтому бугорки всегда одного размера, сколько бы строк ни было.
			    Только path: глобальный сброс стилей обнуляет размеры у circle и rect */}
			{size && (
				<svg
					className='any-level-thought-box__cloud'
					viewBox={`0 0 ${size.width} ${size.height}`}
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'
				>
					<path fill='currentColor' d={getCloudPath(size.width, size.height)} />
				</svg>
			)}
			<span className={cn('any-level-thought-box__tail', tailExtraClass)} aria-hidden='true' />
			<p className='any-level-thought-box__label'>{label}</p>
			<p className='any-level-thought-box__text'>{text}</p>
		</div>
	)
}

export default ThoughtBox
