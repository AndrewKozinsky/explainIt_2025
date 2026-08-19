import cn from 'classnames'
import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'
import DialogContent from '../DialogContent/DialogContent'
import DictionaryContent from '../DictionaryContent/DictionaryContent'
import InfoViewSwitcher from '../InfoViewSwitcher'
import WordsContent from '../WordsContent/WordsContent'
import './DetailsBlockWrapper.scss'

function DetailsBlockWrapper() {
	const mediaStore = useMediaStoreContext()
	const sentenceId = mediaStore((store) => store.selectedSentenceId)

	if (!sentenceId) {
		return (
			<ContentWrapper center>
				<InfoText>Нажмите на слово для перевода.</InfoText>
			</ContentWrapper>
		)
	}

	return (
		<ContentWrapper>
			<div className='details-block-wrapper__switcher'>
				<InfoViewSwitcher />
			</div>
			<div className='details-block-wrapper__content'>
				<DictionaryContent />
				<WordsContent />
				<DialogContent />
			</div>
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

	return (
		<div className={cn('details-block-wrapper', center && 'details-block-wrapper--center')}>
			<div className={cn(!center && 'details-block-wrapper__scroll')}>{children}</div>
		</div>
	)
}

function InfoText({ children }: { children: React.ReactNode }) {
	return <p className='details-block-wrapper__text'>{children}</p>
}
