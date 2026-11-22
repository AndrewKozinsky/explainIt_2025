import type { ButtonIconProps } from '@/shared/ui/icons/buttonIcons/standard/buttonProps'

export function CopyButtonIcon({ extraClass }: ButtonIconProps) {
	return (
		<svg
			className={extraClass}
			aria-hidden='true'
			width='20px'
			height='20px'
			viewBox='0 0 20 20'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g fill='none'>
				<rect
					fill='currentColor'
					fillRule='evenodd'
					opacity='0.0609929435'
					x='0'
					y='0'
					width='20'
					height='20'
				/>
				<path
					d='M14,4 C15.1045695,4 16,4.8954305 16,6 L16,16 C16,17.1045695 15.1045695,18 14,18 L4,18 C2.8954305,18 2,17.1045695 2,16 L2,6 C2,4.8954305 2.8954305,4 4,4 L14,4 Z M14,5 L4,5 C3.44771525,5 3,5.44771525 3,6 L3,16 C3,16.5522847 3.44771525,17 4,17 L14,17 C14.5522847,17 15,16.5522847 15,16 L15,6 C15,5.44771525 14.5522847,5 14,5 Z'
					fill='currentColor'
					fillRule='nonzero'
				/>
				<path
					d='M16.5,1.5 C17.6045695,1.5 18.5,2.3954305 18.5,3.5 L18.5,14 C18.5,14.8284271 17.8284271,15.5 17,15.5 L16.5,15.5 L16.5,14.5 L17,14.5 C17.2761424,14.5 17.5,14.2761424 17.5,14 L17.5,3.5 C17.5,2.94771525 17.0522847,2.5 16.5,2.5 L7,2.5 C6.72385763,2.5 6.5,2.72385763 6.5,3 L6.5,3.5 L5.5,3.5 L5.5,3 C5.5,2.17157288 6.17157288,1.5 7,1.5 L16.5,1.5 Z'
					fill='currentColor'
					fillRule='nonzero'
				/>
			</g>
		</svg>
	)
}
