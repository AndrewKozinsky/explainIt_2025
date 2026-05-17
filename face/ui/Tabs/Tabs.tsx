import cn from 'classnames'
import './Tabs.scss'
import BaseButton from '../BaseButton/BaseButton'

type TabsProps = {
	tabsConfig: TabConfig[]
	currentTabId: string
}

export type TabConfig = {
	id: string
	label: string
	onClick: () => void
}

function Tabs(props: TabsProps) {
	const { tabsConfig, currentTabId } = props

	return (
		<p className='tabs'>
			{tabsConfig.map((tabConfig) => {
				return <LinkButton tabConfig={tabConfig} currentTabId={currentTabId} key={tabConfig.id} />
			})}
		</p>
	)
}

export default Tabs

type LinkButtonProps = {
	currentTabId: string
	tabConfig: TabConfig
}

function LinkButton(props: LinkButtonProps) {
	const { currentTabId, tabConfig } = props

	const isActive = currentTabId === tabConfig.id

	const classes = cn('tabs__button', !isActive && 'tabs__button--link')

	return (
		<BaseButton theme='outline' extraClass={classes} onClick={tabConfig.onClick} current={isActive}>
			{tabConfig.label}
		</BaseButton>
	)
}
