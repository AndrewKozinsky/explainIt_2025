import { MainPageIconProps } from './iconProps'

/** Открытая дверь со стрелкой наружу: сценарий, где вы уходите */
export function DoorExitIcon(props: MainPageIconProps) {
	const { extraClass } = props

	return (
		<svg width='22px' height='22px' viewBox='0 0 22 22' xmlns='http://www.w3.org/2000/svg' className={extraClass}>
			<path
				d='M4,3.221 L4,17.153 L11,19.778 L11,5.846 L4,3.221 Z M12,20.5 C12,20.8491031 11.6513137,21.0907429 11.3244383,20.9681646 L3.32443828,17.9681646 C3.12928642,17.8949826 3,17.7084223 3,17.5 L3,2.5 C3,2.21344454 3.23493345,1.99929437 3.49989662,1.99954785 L15.5,2 C15.7761424,2 16,2.22385763 16,2.5 L16,5 L15,5 L15,3 L6.256,2.99954763 L11.6755617,5.03183541 C11.8707136,5.10501736 12,5.29157772 12,5.5 L12,18 L15,18 L15,16 L16,16 L16,18.5 C16,18.7761424 15.7761424,19 15.5,19 L12,19 L12,20.5 Z'
				fill='currentColor'
				fillRule='nonzero'
			/>
			<path d='M14,10.5 L20,10.5 M17,7.5 L20,10.5 L17,13.5' fill='none' stroke='currentColor' strokeWidth='1' />
		</svg>
	)
}
