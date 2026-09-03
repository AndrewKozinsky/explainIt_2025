export default async function Page({ params }: { params: Promise<{ dialogueId: string; locale: string }> }) {
	const { dialogueId } = await params

	return <p>{dialogueId}</p>
}
