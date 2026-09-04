import AiDialoguePage from '_pages/aiDialogue/AiDialoguePage/AiDialoguePage'

export default async function Page({ params }: { params: Promise<{ dialogueId: string; locale: string }> }) {
	const { dialogueId } = await params

	return <AiDialoguePage dialogueId={dialogueId} />
}
