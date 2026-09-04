import type { DetailsBlockTab, InfoViewType } from '@/entities/detailsBlock/ui/base/DetailsBlock/DetailsBlock'
import ContainerWidthObserver from '@/shared/ui/ContainerWidthObserver/ContainerWidthObserver'
import Switcher from '@/shared/ui/Switcher/Switcher'

type InfoViewSwitcherProps = {
	tabs: [DetailsBlockTab, ...DetailsBlockTab[]]
	currentInfoView: InfoViewType
	setActiveInfoView: (view: InfoViewType) => void
}

function InfoViewSwitcher({ tabs, currentInfoView, setActiveInfoView }: InfoViewSwitcherProps) {
	return (
		<ContainerWidthObserver widths={[500]}>
			{(range) => (
				<Switcher
					type='fit'
					widePaddings={range !== 1}
					orientation='horizontal'
					items={tabs.map((tab) => ({
						text: tab.text,
						onClick: () => setActiveInfoView(tab.type),
						isCurrent: currentInfoView === tab.type,
					}))}
				/>
			)}
		</ContainerWidthObserver>
	)
}

export default InfoViewSwitcher
