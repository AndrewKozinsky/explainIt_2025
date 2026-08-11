import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { youtubeQueries } from '@/entities/youtube/YoutubeQueryFacade'

function useTopicFilter() {
	const [topicKey, setTopicKey] = useState('')

	const { data: topics = [] } = useQuery(youtubeQueries.getVideoTopics())

	return { topicKey, topics, setTopicKey }
}

export default useTopicFilter
