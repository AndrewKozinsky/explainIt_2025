import { MainPageIconProps } from './iconProps'

/** Короткая стрелка вправо по центру иконки */
export function ShortArrowIcon(props: MainPageIconProps) {
	const { extraClass } = props

	return (
		<svg width='22px' height='22px' viewBox='0 0 22 22' xmlns='http://www.w3.org/2000/svg' className={extraClass}>
			{/* Сдвиг стоит на группе: глобальный сброс стилей обнуляет transform у фигур, но не у g */}
			<g fill='currentColor' fillRule='nonzero' transform='translate(7.842, 7.577)'>
				<polygon points='3.1884171 0 2.35780083 0.842175435 4.13366357 2.8315952 0 2.8315952 0 4.01443101 4.13319972 4.01443101 2.35780083 6.00338787 3.1884171 6.84556473 6.31628044 3.42278201' />
			</g>
		</svg>
	)
}
