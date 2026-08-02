import { useDetailsStore } from '@/entites/detailsBlock/detailsStore'
import PhraseDictionary from '_pages/media/dictionary/PhraseDictionary/PhraseDictionary'

function DictionaryContent() {
	const currentInfoView = useDetailsStore((store) => store.currentInfoView)

	if (currentInfoView !== 'dictionary') {
		return null
	}

	return <PhraseDictionary />
}

export default DictionaryContent
