import { AiDialogueModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import { aiDialogueScenarioConfig } from '@/entities/aiDialogueScenario/lib/aiDialogueScenarioConfig'
import MediaCardButton from '@/entities/mediaCard/MediaCard/MediaCardButton'
import MediaCardWrapper from '@/entities/mediaCard/MediaCardWrapper/MediaCardWrapper'
import { EditIcon } from '@/shared/ui/icons/buttonIcons/EditIcon'
import ItemsGrid from '@/shared/ui/media/ItemsGrid/ItemsGrid'
import { getDialoguesCardsConfig } from './fn/getDialoguesCardsConfig'
import './UserAiDialoguesList.scss'

type UserAiDialoguesListProps = {
	dialogues: AiDialogueModel[]
}

function UserAiDialoguesList(props: UserAiDialoguesListProps) {
	const { dialogues } = props

	if (dialogues.length === 0) {
		return (
			<p className='user-ai-dialogues-list__empty'>
				У вас ещё нет ни одного диалога. Выберите сценарий чтобы начать.
			</p>
		)
	}

	const dialoguesCardsConfig = getDialoguesCardsConfig(dialogues)

	return (
		<ItemsGrid>
			{dialoguesCardsConfig.map((dialogue) => {
				return (
					<MediaCardWrapper actionIcon={<EditIcon />} key={dialogue.id}>
						<MediaCardButton
							title={dialogue.title}
							url={dialogue.url}
							defaultMediaName={aiDialogueScenarioConfig.emptyScenarioName}
						/>
					</MediaCardWrapper>
				)
			})}
		</ItemsGrid>
	)
}

export default UserAiDialoguesList
