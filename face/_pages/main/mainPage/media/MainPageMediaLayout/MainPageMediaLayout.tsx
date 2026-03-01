import cn from 'classnames'
import './MainPageMediaLayout.scss'

type MediaLayoutProps = {
	reverseDirection?: boolean
	videoUrl: string
	children: React.ReactNode[]
}

export function MainPageMediaLayout(props: MediaLayoutProps) {
	const { reverseDirection, videoUrl, children } = props

	return (
		<div className={cn('main-page-media-layout', reverseDirection && 'main-page-media-layout--reverse')}>
			<video src={videoUrl} className='main-page-media-layout__video' autoPlay muted loop playsInline />
			<div className='main-page-media-layout__content'>{children}</div>
		</div>
	)
}
