'use client'

import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { aiDialogueScenarioGroupQueries } from '@/entities/aiDialogueScenarioGroup/AiDialogueScenarioGroupQueryFacade'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { getScenarioGroupsConfig } from './fn/getScenarioGroupsConfig'
import { useAiDialogueScenarioClick } from './fn/useAiDialogueScenarioClick'
import LoginPromptModal from './ui/LoginPromptModal/LoginPromptModal'
import PublicScenarioGroup from './ui/PublicScenarioGroup/PublicScenarioGroup'
import './PublicAiDialogueScenariosList.scss'

export default function PublicAiDialogueScenariosList() {
	const locale = useLocale()
	const query = useQuery(aiDialogueScenarioGroupQueries.getAiDialogueScenarioGroups())
	const { onScenarioClick, creatingScenarioId, isLoginModalOpen, closeLoginModal, onLoginClick, onRegisterClick } =
		useAiDialogueScenarioClick()

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
			<LoginPromptModal
				isOpen={isLoginModalOpen}
				onClose={closeLoginModal}
				onLogin={onLoginClick}
				onRegister={onRegisterClick}
			/>
		</div>
	)
}
