import { ButtonIconProps } from '@/shared/ui/icons/buttonIcons/standard/buttonProps'

export function LockSmallButtonIcon(props: ButtonIconProps) {
	const { extraClass } = props

	return (
		<svg
			className={extraClass}
			aria-hidden='true'
			width='14px'
			height='14px'
			viewBox='0 0 14 14'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
		>
			<defs>
				<path d='M0,0 L14,0 L14,14 L0,14 L0,0 Z' id='path-1'></path>
			</defs>
			<g stroke='none' fill='none' xlinkHref='#path-1'>
				<path
					d='M7,0.5 C8.93299662,0.5 10.5,2.06700338 10.5,4 L10.5,6.5 L9.5,6.5 L9.5,4 C9.5,2.61928813 8.38071187,1.5 7,1.5 C5.61928813,1.5 4.5,2.61928813 4.5,4 L4.5,6.5 L3.5,6.5 L3.5,4 C3.5,2.06700338 5.06700338,0.5 7,0.5 Z'
					fill='currentColor'
					fillRule='nonzero'
				></path>
				<path
					d='M11,6 C12.1045695,6 13,6.8954305 13,8 L13,12 C13,13.1045695 12.1045695,14 11,14 L3,14 C1.8954305,14 1,13.1045695 1,12 L1,8 C1,6.8954305 1.8954305,6 3,6 L11,6 Z M11,7 L3,7 C2.44771525,7 2,7.44771525 2,8 L2,12 C2,12.5522847 2.44771525,13 3,13 L11,13 C11.5522847,13 12,12.5522847 12,12 L12,8 C12,7.44771525 11.5522847,7 11,7 Z'
					fill='currentColor'
					fillRule='nonzero'
				></path>
				<path
					d='M7,8 C7.55228475,8 8,8.8954305 8,10 C8,11.1045695 7.55228475,12 7,12 C6.44771525,12 6,11.1045695 6,10 C6,8.8954305 6.44771525,8 7,8 Z'
					fill='currentColor'
					fillRule='nonzero'
				></path>
			</g>
		</svg>
	)
}
