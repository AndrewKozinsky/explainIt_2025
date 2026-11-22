import type { ButtonIconProps } from '@/shared/ui/icons/buttonIcons/standard/buttonProps'

export function FullScreenButtonIcon({ extraClass }: ButtonIconProps) {
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
					d='M2.5,12 C2.77614237,12 3,12.2238576 3,12.5 L3,15.5 C3,16.3284271 3.67157288,17 4.5,17 L7.5,17 C7.77614237,17 8,17.2238576 8,17.5 C8,17.7761424 7.77614237,18 7.5,18 L4.5,18 C3.11928813,18 2,16.8807119 2,15.5 L2,12.5 C2,12.2238576 2.22385763,12 2.5,12 Z'
					fill='currentColor'
					fillRule='nonzero'
				/>
				<path
					d='M12.5,12 C12.7761424,12 13,12.2238576 13,12.5 L13,15.5 C13,16.3284271 13.6715729,17 14.5,17 L17.5,17 C17.7761424,17 18,17.2238576 18,17.5 C18,17.7761424 17.7761424,18 17.5,18 L14.5,18 C13.1192881,18 12,16.8807119 12,15.5 L12,12.5 C12,12.2238576 12.2238576,12 12.5,12 Z'
					fill='currentColor'
					fillRule='nonzero'
					transform='translate(15, 15) scale(-1, 1) translate(-15, -15)'
				/>
				<path
					d='M2.5,2 C2.77614237,2 3,2.22385763 3,2.5 L3,5.5 C3,6.32842712 3.67157288,7 4.5,7 L7.5,7 C7.77614237,7 8,7.22385763 8,7.5 C8,7.77614237 7.77614237,8 7.5,8 L4.5,8 C3.11928813,8 2,6.88071187 2,5.5 L2,2.5 C2,2.22385763 2.22385763,2 2.5,2 Z'
					fill='currentColor'
					fillRule='nonzero'
					transform='translate(5, 5) scale(1, -1) translate(-5, -5)'
				/>
				<path
					d='M12,2 C12.2761424,2 12.5,2.22385763 12.5,2.5 L12.5,6 C12.5,6.82842712 13.1715729,7.5 14,7.5 L17.5,7.5 C17.7761424,7.5 18,7.72385763 18,8 C18,8.27614237 17.7761424,8.5 17.5,8.5 L14,8.5 C12.6192881,8.5 11.5,7.38071187 11.5,6 L11.5,2.5 C11.5,2.22385763 11.7238576,2 12,2 Z'
					fill='currentColor'
					fillRule='nonzero'
					transform='translate(14.75, 5.25) scale(-1, -1) translate(-14.75, -5.25)'
				/>
			</g>
		</svg>
	)
}
