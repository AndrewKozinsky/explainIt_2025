import ContainerWidthObserver from 'ui/ContainerWidthObserver/ContainerWidthObserver'
import Switcher from 'ui/Switcher/Switcher'
import { useDetailsStore } from './detailsStore'

function InfoViewSwitcher() {
	const currentInfoView = useDetailsStore((store) => store.currentInfoView)
	const setActiveInfoView = useDetailsStore((store) => store.setActiveInfoView)

	return (
		<ContainerWidthObserver widths={[500]}>
			{(range) => (
				<Switcher
					type='fit'
					widePaddings={range !== 1}
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
			)}
		</ContainerWidthObserver>
	)
}

export default InfoViewSwitcher
