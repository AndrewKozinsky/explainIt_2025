import cn from 'classnames'
import { useFlashcard_Add } from 'graphql'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'

type FlashCardButtonProps = {
	phraseId: string
}

function FlashCardButton(props: FlashCardButtonProps) {
	const { phraseId } = props

	const [flashcardAdd, { loading }] = useFlashcard_Add()

	const handleClick = () => {
		/*flashcardAdd({
			variables: {
				input: {
					sentencePhraseTranslationId,
				},
			},
		})*/
	}

	return (
		<button
			className={cn('sentence-phrase-analysis__flash-button', 'sentence-phrase-analysis__flash-button--add')}
			onClick={handleClick}
			disabled={loading}
		>
			<img src={publicFolderFilesUrls.icons.addIcon} alt='' />
		</button>
	)
}

export default FlashCardButton
