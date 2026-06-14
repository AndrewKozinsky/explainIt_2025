import Switcher from 'ui/Switcher/Switcher'
import { useDetailsStore } from './detailsStore'

function InfoViewSwitcher() {
	const currentInfoView = useDetailsStore((store) => store.currentInfoView)
	const setActiveInfoView = useDetailsStore((store) => store.setActiveInfoView)

	return (
		<Switcher
			type='fit'
			widePaddings
			orientation='horizontal'
			items={[
				{
					text: 'Словарь',
					onClick: () => setActiveInfoView('dictionary'),
					isCurrent: currentInfoView === 'dictionary',
				},
				{
					text: 'Слова',
					onClick: () => setActiveInfoView('words'),
					isCurrent: currentInfoView === 'words',
				},
				{
					text: 'Диалог',
					onClick: () => setActiveInfoView('ai_dialog'),
					isCurrent: currentInfoView === 'ai_dialog',
				},
			]}
		/>
	)
}

export default InfoViewSwitcher
