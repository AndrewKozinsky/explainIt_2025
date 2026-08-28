import ContainerWidthObserver from '@/shared/ui/ContainerWidthObserver/ContainerWidthObserver'
import Switcher from '@/shared/ui/Switcher/Switcher'
import type { InfoViewType } from './ViewRouter/DetailsBlockWrapper'

type InfoViewSwitcherProps = {
	currentInfoView: InfoViewType
	setActiveInfoView: (view: InfoViewType) => void
}

function InfoViewSwitcher({ currentInfoView, setActiveInfoView }: InfoViewSwitcherProps) {
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
							text: 'Фразы',
							onClick: () => setActiveInfoView('words'),
							isCurrent: currentInfoView === 'words',
						},
						/*{
							text: 'Диалог',
							onClick: () => setActiveInfoView('ai_dialog'),
							isCurrent: currentInfoView === 'ai_dialog',
						},*/
					]}
				/>
			)}
		</ContainerWidthObserver>
	)
}

export default InfoViewSwitcher
