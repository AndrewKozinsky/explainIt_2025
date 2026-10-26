'use client'

import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { aiDialogueScenarioGroupQueries } from '@/entities/aiDialogueScenarioGroup/AiDialogueScenarioGroupQueryFacade'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { getScenarioGroupsConfig } from './fn/getScenarioGroupsConfig'
import { useAiDialogueScenarioClick } from './fn/useAiDialogueScenarioClick'
import LoginPromptModal from './ui/LoginPromptModal/LoginPromptModal'
import PublicScenarioGroup from './ui/PublicScenarioGroup/PublicScenarioGroup'
import StartDialogueModal from './ui/StartDialogueModal/StartDialogueModal'
import './PublicAiDialogueScenariosList.scss'

export default function PublicAiDialogueScenariosList() {
	const locale = useLocale()
	const query = useQuery(aiDialogueScenarioGroupQueries.getAiDialogueScenarioGroups())
	const {
		onScenarioClick,
		selectedScenarioId,
		closeScenarioModal,
		onStartDialogue,
		creatingScenarioId,
		isLoginModalOpen,
		closeLoginModal,
		onLoginClick,
		onRegisterClick,
	} = useAiDialogueScenarioClick()

	if (query.isPending) return <p role='status'>Загружаю сценарии…</p>

	if (query.isError && !query.data) {
		return (
			<div role='alert' className='public-ai-dialogue-scenarios-list__error'>
				<p>Не удалось загрузить сценарии.</p>
				<Button onClick={() => void query.refetch()} disabled={query.isFetching}>
					Повторить
				</Button>
			</div>
		)
	}

	const groups = getScenarioGroupsConfig(query.data ?? [], locale)
	if (!groups.length) return <p>Пока нет доступных сценариев.</p>

	const selectedGroup = groups.find((group) => group.scenarios.some((scenario) => scenario.id === selectedScenarioId))
	const selectedScenario = selectedGroup?.scenarios.find((scenario) => scenario.id === selectedScenarioId)

	return (
		<div className='public-ai-dialogue-scenarios-list'>
			{groups.map((group) => (
				<PublicScenarioGroup
					key={group.id}
					group={group}
					creatingScenarioId={creatingScenarioId}
					onScenarioClick={onScenarioClick}
				/>
			))}
			{selectedScenario && selectedGroup && (
				<StartDialogueModal
					scenario={selectedScenario}
					groupTitle={selectedGroup.title}
					loading={creatingScenarioId !== null}
					onClose={closeScenarioModal}
					onStart={onStartDialogue}
				/>
			)}
			<LoginPromptModal
				isOpen={isLoginModalOpen}
				onClose={closeLoginModal}
				onLogin={onLoginClick}
				onRegister={onRegisterClick}
			/>
		</div>
	)
}
