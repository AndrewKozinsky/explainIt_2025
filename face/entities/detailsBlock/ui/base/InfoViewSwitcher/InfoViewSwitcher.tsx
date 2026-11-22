import type { DetailsBlockTab } from '@/entities/detailsBlock/ui/base/DetailsBlock/DetailsBlock'
import ContainerWidthObserver from '@/shared/ui/ContainerWidthObserver/ContainerWidthObserver'
import Switcher from '@/shared/ui/Switcher/Switcher'

type InfoViewSwitcherProps<TabId extends string> = {
	tabs: DetailsBlockTab<TabId>[]
	currentInfoView: TabId
	setActiveInfoView: (view: TabId) => void
}

function InfoViewSwitcher<TabId extends string>({
	tabs,
	currentInfoView,
	setActiveInfoView,
}: InfoViewSwitcherProps<TabId>) {
	return (
		<ContainerWidthObserver widths={[500]}>
			{(range) => (
				<Switcher
					type='fit'
					widePaddings={range !== 1}
					orientation='horizontal'
					items={tabs.map((tab) => ({
						content: tab.icon ?? tab.text,
						ariaLabel: tab.text,
						onClick: () => setActiveInfoView(tab.id),
						isCurrent: currentInfoView === tab.id,
					}))}
				/>
			)}
		</ContainerWidthObserver>
	)
}

export default InfoViewSwitcher
