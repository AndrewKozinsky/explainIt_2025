import { useState } from 'react'
import PhrasesContent from '@/entities/detailsBlock/ui/PhrasesContent/PhrasesContent'
import DetailsBlockContentWrapper from '../base/DetailsBlockContentWrapper/DetailsBlockContentWrapper'
import DictionaryContent from '../DictionaryContent/DictionaryContent'
import InfoViewSwitcher from '../InfoViewSwitcher'
import './DetailsBlock.scss'

export type InfoViewType = 'dictionary' | 'words' | 'ai_dialog'

function DetailsBlock() {
	const [currentInfoView, setCurrentInfoView] = useState<InfoViewType>('dictionary')

	return (
		<DetailsBlockContentWrapper>
			<div className='details-block-wrapper__switcher'>
				<InfoViewSwitcher currentInfoView={currentInfoView} setActiveInfoView={setCurrentInfoView} />
			</div>
			<div className='details-block-wrapper__content'>
				{currentInfoView === 'dictionary' && <DictionaryContent />}
				{currentInfoView === 'words' && <PhrasesContent />}
				{/*{currentInfoView === 'ai_dialog' && <DialogContent />}*/}
			</div>
		</DetailsBlockContentWrapper>
	)
}

export default DetailsBlock
