import { useTranslations } from 'next-intl'
import MainPageNote from '../../MainPageNote/MainPageNote'
import MainPageSection from '../../MainPageSection/MainPageSection'
import ScenarioCard from '../ScenarioCard/ScenarioCard'
import { scenarioConfigs } from './fn/scenarioConfigs'
import './MainPageScenarios.scss'

/** Блок главной страницы: одна сцена может продолжиться по-разному в зависимости от ваших слов и поступков */
function MainPageScenarios() {
	const t = useTranslations('mainPageScenarios')

	return (
		<MainPageSection eyebrow={t('eyebrow')} header={t('header')}>
			{/* Пока сценарии не помещаются в три колонки, третий скрыт */}
			<ul className='main-page-scenarios'>
				{scenarioConfigs.map((config) => (
					<li className='main-page-scenarios__item' key={config.id}>
						<ScenarioCard config={config} />
					</li>
				))}
			</ul>
			<MainPageNote>{t('note')}</MainPageNote>
		</MainPageSection>
	)
}

export default MainPageScenarios
