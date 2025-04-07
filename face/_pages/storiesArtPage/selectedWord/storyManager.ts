// import { useStoryStore } from '../store/store'
// import { StoryConfigT } from '../storyTypes'

/*export class StoryManager {
	// Помечает слово выделенным
	selectWord(sentenceId: number, wordId: number) {
		useStoryStore.setState({ selectedSentenceId: sentenceId, selectedWordId: wordId })
	}

	// Выделено ли слово
	isWordSelected(sentenceId: number, wordId: number) {
		return (
			useStoryStore.getState().selectedSentenceId === sentenceId &&
			useStoryStore.getState().selectedWordId === wordId
		)
	}

	getSelectedSentence() {
		const storyConfig = useStoryStore().storyConfig
		const selectedSentenceId = useStoryStore().selectedSentenceId

		if (!selectedSentenceId) return null

		return this.findSentenceById(storyConfig, selectedSentenceId)
	}

	getSelectedWord() {
		const storyConfig = useStoryStore().storyConfig
		const sentenceId = useStoryStore().selectedSentenceId
		const wordId = useStoryStore().selectedWordId

		if (!sentenceId || !wordId) return null

		return this.findWordById(storyConfig, sentenceId, wordId)
	}

	findSentenceById(
		storyConfig: StoryConfigT.Story,
		sentenceId: number,
	): null | StoryConfigT.Sentence {
		let sentence: null | StoryConfigT.Sentence = null

		storyConfig.paragraphs.forEach((paragraph) => {
			paragraph.sentences.forEach((sentenceItem) => {
				if (sentenceItem.id !== sentenceId) return
				sentence = sentenceItem
			})
		})

		return sentence
	}

	findWordById(
		storyConfig: StoryConfigT.Story,
		sentenceId: number,
		wordId: number,
	): null | StoryConfigT.Word {
		let word: null | StoryConfigT.Word = null

		storyConfig.paragraphs.forEach((paragraph) => {
			paragraph.sentences.forEach((sentenceItem) => {
				if (sentenceItem.id !== sentenceId) return

				sentenceItem.sentenceParts.forEach((wordItem) => {
					if (wordItem.type !== 'word') {
						return
					}

					if (wordItem.id === wordId) {
						word = wordItem
					}
				})
			})
		})

		return word
	}
}*/
