import cn from 'classnames'
import Spinner from 'ui/Spinner/Spinner'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import { useFlashCardButton } from './fn/useFlashCardButton'

type FlashCardButtonProps = {
	sentencePhraseId: number
	flashcardId: null | number
}

function FlashCardButton(props: FlashCardButtonProps) {
	const view = useFlashCardButton(props)

	if (view.state === 'hidden') return null

	return (
		<button
			className={cn(
				'sentence-phrase-analysis__flash-button',
				`sentence-phrase-analysis__flash-button--${view.state}`,
			)}
			onClick={view.onClick}
			disabled={view.disabled}
		>
			{view.state === 'loading' && <Spinner size='extra-small' color='white' />}
			{view.state === 'add' && <img src={publicFolderFilesUrls.icons.addIcon} alt='' />}
			{view.state === 'remove' && <img src={publicFolderFilesUrls.icons.closeIcon} alt='' />}
		</button>
	)
}

export default FlashCardButton
