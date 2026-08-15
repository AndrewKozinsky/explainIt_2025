import { useDetailsStore } from '@/entities/detailsBlock/detailsStore'
import { PhraseDictionary } from '@/widgets/dictionary'

function DictionaryContent() {
	const currentInfoView = useDetailsStore((store) => store.currentInfoView)

	if (currentInfoView !== 'dictionary') {
		return null
	}

	return <PhraseDictionary />
}

export default DictionaryContent
