import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { youtubeQueries } from '@/entities/youtube/YoutubeQueryFacade'
import { localStorageManager } from '@/shared/utils/localStorageManager'

function useTopicFilter() {
	const [topicKey, setTopicKey] = useState<string>(function () {
		return localStorageManager.lastTopic.get()
	})

	useEffect(
		function () {
			localStorageManager.lastTopic.set(topicKey)
		},
		[topicKey],
	)

	const { data: topics = [] } = useQuery(youtubeQueries.getVideoTopics())

	return { topicKey, setTopicKey, topics }
}

export default useTopicFilter
