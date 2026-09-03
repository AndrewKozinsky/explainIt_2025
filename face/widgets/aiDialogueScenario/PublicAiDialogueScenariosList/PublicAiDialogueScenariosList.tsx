import { aiDialogueScenarioConfig } from '@/entities/aiDialogueScenario/lib/aiDialogueScenarioConfig'
import { AiDialogueScenarioModel } from '@/entities/aiDialogueScenario/repository/AiDialogueScenarioRepository'
import MediaCardButton from '@/entities/mediaCard/MediaCard/MediaCardButton'
import LanguageSwitch from '@/shared/ui/LanguageSwitch/LanguageSwitch'
import ItemsGrid from '@/shared/ui/media/ItemsGrid/ItemsGrid'
import { getScenarioCardsConfig } from './fn/getScenarioCardsConfig'
import { useAiDialogueScenarioClick } from './fn/useAiDialogueScenarioClick'
import { useLanguageChange } from './fn/useLanguageChange'
import LoginPromptModal from './ui/LoginPromptModal/LoginPromptModal'
import './PublicAiDialogueScenariosList.scss'

type PublicAiDialogueScenariosListProps = {
	scenarios: AiDialogueScenarioModel[]
}

function PublicAiDialogueScenariosList(props: PublicAiDialogueScenariosListProps) {
	const { scenarios } = props

	const languages = scenarios.map((item) => item.languageCode)
	const languagesSet = new Set(languages)
	const { currentLang, onLanguageChange } = useLanguageChange(languages)
	const { onScenarioClick, isLoginModalOpen, closeLoginModal, onLoginClick, onRegisterClick } =
		useAiDialogueScenarioClick()

	const scenarioCardsConfig = getScenarioCardsConfig(scenarios, currentLang)

	return (
		<div className='public-ai-dialogue-scenarios-list'>
			<LanguageSwitch
				languages={Array.from(languagesSet)}
				currentLang={currentLang}
				onChange={onLanguageChange}
			/>
			<ItemsGrid>
				{scenarioCardsConfig.map((scenario) => {
					return (
						<MediaCardButton
							key={scenario.id}
							title={scenario.title}
							subTitle={scenario.description}
							onClick={() => onScenarioClick(scenario.id)}
							defaultMediaName={aiDialogueScenarioConfig.emptyScenarioName}
						/>
					)
				})}
			</ItemsGrid>
			<LoginPromptModal
				isOpen={isLoginModalOpen}
				onClose={closeLoginModal}
				onLogin={onLoginClick}
				onRegister={onRegisterClick}
			/>
		</div>
	)
}

export default PublicAiDialogueScenariosList
