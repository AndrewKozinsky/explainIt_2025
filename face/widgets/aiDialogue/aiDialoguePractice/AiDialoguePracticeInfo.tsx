import type { AiDialogueScenarioModel } from '@/entities/aiDialogueScenario/AiDialogueScenarioModel'
import AiDialogueConversationTopics from '@/widgets/aiDialogue/aiDialogueConversationTopics/AiDialogueConversationTopics'

type Props = {
	scenario: Pick<AiDialogueScenarioModel, 'conversationIdeas'>
}

export default function AiDialoguePracticeInfo({ scenario }: Props) {
	return <AiDialogueConversationTopics conversationIdeas={scenario.conversationIdeas} />
}
