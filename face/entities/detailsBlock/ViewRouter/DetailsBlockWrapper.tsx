import { useState } from 'react'
import cn from 'classnames'
import DictionaryContent from '../DictionaryContent/DictionaryContent'
import InfoViewSwitcher from '../InfoViewSwitcher'
import WordsContent from '../WordsContent/WordsContent'
import './DetailsBlockWrapper.scss'

export type InfoViewType = 'dictionary' | 'words' | 'ai_dialog'

type DetailsBlockWrapperProps = {
	sentenceId: null | number
}

function DetailsBlockWrapper(props: DetailsBlockWrapperProps) {
	const { sentenceId } = props

	const [currentInfoView, setCurrentInfoView] = useState<InfoViewType>('dictionary')

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
				<InfoViewSwitcher currentInfoView={currentInfoView} setActiveInfoView={setCurrentInfoView} />
			</div>
			<div className='details-block-wrapper__content'>
				{currentInfoView === 'dictionary' && <DictionaryContent />}
				{currentInfoView === 'words' && <WordsContent />}
				{/*{currentInfoView === 'ai_dialog' && <DialogContent />}*/}
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
