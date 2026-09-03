import { AiDialogueModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import { aiDialogueScenarioConfig } from '@/entities/aiDialogueScenario/lib/aiDialogueScenarioConfig'
import MediaCardButton from '@/entities/mediaCard/MediaCard/MediaCardButton'
import MediaCardWrapper from '@/entities/mediaCard/MediaCardWrapper/MediaCardWrapper'
import DeleteEntityModal from '@/shared/ui/DeleteEntityButtonAndModal/DeleteEntityModal'
import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/TrashButtonIcon'
import ItemsGrid from '@/shared/ui/media/ItemsGrid/ItemsGrid'
import { getDialoguesCardsConfig } from './fn/getDialoguesCardsConfig'
import { useAiDialogueDelete } from './fn/useAiDialogueDelete'
import './UserAiDialoguesList.scss'

type UserAiDialoguesListProps = {
	dialogues: AiDialogueModel[]
}

function UserAiDialoguesList(props: UserAiDialoguesListProps) {
	const { dialogues } = props

	const { isModalOpen, status, openDeleteModal, closeDeleteModal, onConfirmDelete } = useAiDialogueDelete()

	if (dialogues.length === 0) {
		return (
			<p className='user-ai-dialogues-list__empty'>
				У вас ещё нет ни одного диалога. Выберите сценарий чтобы начать.
			</p>
		)
	}

	const dialoguesCardsConfig = getDialoguesCardsConfig(dialogues)

	return (
		<>
			<ItemsGrid>
				{dialoguesCardsConfig.map((dialogue) => {
					return (
						<MediaCardWrapper
							actionIcon={<TrashButtonIcon />}
							key={dialogue.id}
							onActionClick={() => openDeleteModal(dialogue.id)}
						>
							<MediaCardButton
								title={dialogue.title}
								url={dialogue.url}
								defaultMediaName={aiDialogueScenarioConfig.emptyScenarioName}
							/>
						</MediaCardWrapper>
					)
				})}
			</ItemsGrid>
			<DeleteEntityModal
				isModalOpen={isModalOpen}
				closeModal={closeDeleteModal}
				onDeleteButtonClick={onConfirmDelete}
				isDeleteButtonLoading={status === 'loading'}
				modal={{
					header: 'Удаление диалога',
					content: 'Вы уверены, что хотите удалить диалог?',
					confirmButtonText: 'Удалить диалог',
				}}
			/>
		</>
	)
}

export default UserAiDialoguesList
