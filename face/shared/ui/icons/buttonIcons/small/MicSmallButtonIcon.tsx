import { ButtonIconProps } from '@/shared/ui/icons/buttonIcons/standard/buttonProps'

export function MicSmallButtonIcon(props: ButtonIconProps) {
	const { extraClass } = props

	return (
		<svg
			className={extraClass}
			aria-hidden='true'
			width='11px'
			height='14px'
			viewBox='0 0 11 14'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
		>
			<defs>
				<path d='M0,0 L11,0 L11,14 L0,14 L0,0 Z' id='path-1'></path>
			</defs>
			<g stroke='none' fill='none' xlinkHref='#path-1' fillRule='evenodd'>
				<rect id='Rectangle' fill='#FFFFFF' opacity='0.100000001' x='0' y='0' width='11' height='14'></rect>
				<g strokeWidth='1' transform='translate(1, 0)' fill='currentColor'>
					<path
						d='M4.5,0 C6.43299662,0 8,1.56700338 8,3.5 L8,6.5 C8,8.43299662 6.43299662,10 4.5,10 C2.56700338,10 1,8.43299662 1,6.5 L1,3.5 C1,1.56700338 2.56700338,0 4.5,0 Z M4.5,1 C3.11928813,1 2,2.11928813 2,3.5 L2,6.5 C2,7.88071187 3.11928813,9 4.5,9 C5.88071187,9 7,7.88071187 7,6.5 L7,3.5 C7,2.11928813 5.88071187,1 4.5,1 Z'
						fillRule='nonzero'
					></path>
					<path
						d='M9,6.6 C9.2209139,6.6 9.4,6.7790861 9.4,7 C9.4,9.28850087 7.46349459,11.1530161 4.9998826,11.3773604 L4.999,12.999 L6.5,13 C6.77614237,13 7,13.2238576 7,13.5 C7,13.7761424 6.77614237,14 6.5,14 L2.5,14 C2.22385763,14 2,13.7761424 2,13.5 C2,13.2238576 2.22385763,13 2.5,13 L3.999,12.999 L3.99911283,11.3772688 C1.53597901,11.1525092 -0.4,9.2881898 -0.4,7 C-0.4,6.7790861 -0.2209139,6.6 -3.64486219e-13,6.6 C0.2209139,6.6 0.4,6.7790861 0.4,7 C0.4,8.97704451 2.22582493,10.6 4.5,10.6 C6.77417507,10.6 8.6,8.97704451 8.6,7 C8.6,6.7790861 8.7790861,6.6 9,6.6 Z'
						fillRule='nonzero'
					></path>
				</g>
			</g>
		</svg>
	)
}
