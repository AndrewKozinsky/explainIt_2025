import { MainPageIconProps } from './iconProps'

/** Треугольник воспроизведения. Слегка сдвинут вправо, чтобы на глаз стоять в центре круга */
export function PlayIcon(props: MainPageIconProps) {
	const { extraClass } = props

	return (
		<svg width='24px' height='28px' viewBox='0 0 24 28' xmlns='http://www.w3.org/2000/svg' className={extraClass}>
			<path
				d='M3,1.6 C3,0.8 3.9,0.3 4.6,0.8 L22.9,12.5 C23.5,12.9 23.5,13.8 22.9,14.2 L4.6,25.9 C3.9,26.4 3,25.9 3,25.1 Z'
				fill='currentColor'
			/>
		</svg>
	)
}
