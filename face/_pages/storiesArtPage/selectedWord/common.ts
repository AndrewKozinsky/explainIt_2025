// import { useMemo } from 'react'
// import { useStoryStore } from '../store/store'
// import { StoryConfigT } from '../storyTypes'
// import { StoryManager } from './storyManager'

/*export function useGetSelectedWord(): null | StoryConfigT.Word {
	const sentenceId = useStoryStore().selectedSentenceId
	const wordId = useStoryStore().selectedWordId

	const storyManager = new StoryManager()
	const word = storyManager.getSelectedWord()

	return useMemo(
		function () {
			if (!word) {
				return null
			}

			return word
		},
		[wordId, sentenceId],
	)
}*/
