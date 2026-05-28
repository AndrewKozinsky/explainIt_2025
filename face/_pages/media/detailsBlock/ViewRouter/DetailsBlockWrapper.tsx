// import cn from 'classnames'
// import { useDetailsStore } from '../detailsStore'
// import ReadingDetailsBlock from '../ReadingDetailsBlock/ReadingDetailsBlock'
// import WatchingDetailsBlock from '../WatchingDetailsBlock/WatchingDetailsBlock'
// import './DetailsBlockWrapper.scss'

/*type ViewRouterProps = {
	mediaType: 'reading' | 'watching'
}*/

/*function DetailsBlockWrapper(props: ViewRouterProps) {
	const { mediaType } = props

	const sentenceId = useDetailsStore((store) => store.currentSentenceId)

	if (!sentenceId) {
		return (
			<ContentWrapper center>
				<InfoText>Нажмите на слово для перевода.</InfoText>
			</ContentWrapper>
		)
	}

	return (
		<ContentWrapper>
			{mediaType === 'reading' && <ReadingDetailsBlock />}
			{mediaType === 'watching' && <WatchingDetailsBlock />}
		</ContentWrapper>
	)
}*/

// export default DetailsBlockWrapper

// ------------

/*type ContentWrapperProps = {
	center?: boolean
	children: React.ReactNode
}*/

/*function ContentWrapper(props: ContentWrapperProps) {
	const { center, children } = props

	return (
		<div className={cn('details-block-wrapper', center && 'details-block-wrapper--center')}>
			<div className='details-block-wrapper__scroll'>{children}</div>
		</div>
	)
}*/

/*function InfoText({ children }: { children: React.ReactNode }) {
	return <p className='details-block-wrapper__text'>{children}</p>
}*/
