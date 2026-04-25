import cn from 'classnames'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import { findSentenceEntry } from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import WatchingDetailsBlock from '_pages/media/detailsBlock/WatchingDetailsBlock/WatchingDetailsBlock'
import { useDetailsStore } from '../detailsStore'
import ReadingDetailsBlock from '../ReadingDetailsBlock/ReadingDetailsBlock'
import './DetailsBlockWrapper.scss'

type ViewRouterProps = {
	mediaType: 'reading' | 'watching'
}

function DetailsBlockWrapper(props: ViewRouterProps) {
	const { mediaType } = props

	const sentenceId = useDetailsStore((store) => store.currentSentenceId)
	const error = useDetailsStore(function (store) {
		const entry = findSentenceEntry({
			sentences: store.sentences,
			sentenceId: store.currentSentenceId,
		})
		return entry?.data.sentence.error ?? null
	})

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

	const isLoading = useDetailsStore(function (store) {
		const entry = findSentenceEntry({
			sentences: store.sentences,
			sentenceId: store.currentSentenceId,
		})
		return entry?.data.sentence.loading ?? false
	})

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
