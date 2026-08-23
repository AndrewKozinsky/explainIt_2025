import './MediaFormSurface.scss'

type MediaFormSurfaceProps = {
	children: React.ReactNode
	leftBottomButtons: React.ReactNode[]
	rightBottomButtons: React.ReactNode[]
}

function MediaFormSurface(props: MediaFormSurfaceProps) {
	const { children, leftBottomButtons, rightBottomButtons } = props

	return (
		<div className='media-form-surface'>
			<div className='media-form-surface__content'>{children}</div>
			<div className='media-form-surface__bottom'>
				<div className='media-form-surface__bottom-buttons'>{leftBottomButtons}</div>
				<div className='media-form-surface__bottom-buttons'>{rightBottomButtons}</div>
			</div>
		</div>
	)
}

export default MediaFormSurface
