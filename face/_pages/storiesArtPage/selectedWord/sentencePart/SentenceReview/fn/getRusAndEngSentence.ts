// import { useMemo } from 'react'
// import { useStoryStore } from '../../../../store/store'
// import { StoryManager } from '../../../storyManager'

/*export function useGetRusAndEngSentence() {
	const selectedSentenceId = useStoryStore().selectedSentenceId

	const storyManager = new StoryManager()
	const sentence = storyManager.getSelectedSentence()

	return useMemo(
		function (): { rus: string; eng: string } {
			if (!sentence) {
				return {
					rus: '',
					eng: '',
				}
			}

			return sentence.sentence
		},
		[selectedSentenceId],
	)
}*/
