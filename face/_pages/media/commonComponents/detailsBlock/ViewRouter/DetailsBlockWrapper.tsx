import cn from 'classnames'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import WatchingDetailsBlock from '_pages/media/commonComponents/detailsBlock/WatchingDetailsBlock/WatchingDetailsBlock'
import { useDetailsStore } from '../detailsStore'
import ReadingDetailsBlock from '../ReadingDetailsBlock/ReadingDetailsBlock'
import './DetailsBlockWrapper.scss'

type ViewRouterProps = {
	mediaType: 'reading' | 'watching'
}

function DetailsBlockWrapper(props: ViewRouterProps) {
	const { mediaType } = props

	const sentenceId = useDetailsStore((store) => store.sentenceId)
	const error = useDetailsStore((store) => store.error)

	if (!sentenceId) {
		return (
			<ContentWrapper center>
				<InfoText>Нажмите на слово для перевода.</InfoText>
			</ContentWrapper>
		)
	}

	if (error) {
		return (
			<ContentWrapper center>
				<InfoText>
					<ErrorMessage text={error} />
				</InfoText>
			</ContentWrapper>
		)
	}

	return (
		<ContentWrapper>
			{mediaType === 'reading' && <ReadingDetailsBlock />}
			{mediaType === 'watching' && <WatchingDetailsBlock />}
		</ContentWrapper>
	)
}

export default DetailsBlockWrapper

// ------------

type ContentWrapperProps = {
	center?: boolean
	children: React.ReactNode
}

function ContentWrapper(props: ContentWrapperProps) {
	const { center, children } = props

	const isLoading = useDetailsStore((store) => store.isLoading)

	return (
		<div
			className={cn(
				'details-block-wrapper',
				center && 'details-block-wrapper--center',
				isLoading && 'details-block-wrapper--loading',
			)}
		>
			<div className='details-block-wrapper__scroll'>{children}</div>
		</div>
	)
}

function InfoText({ children }: { children: React.ReactNode }) {
	return <p className='details-block-wrapper__text'>{children}</p>
}
