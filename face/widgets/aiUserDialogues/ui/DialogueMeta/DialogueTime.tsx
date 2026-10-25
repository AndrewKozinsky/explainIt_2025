import type { getDialogueTime } from './fn/getDialogueTime'

export default function DialogueTime({ time }: { time: NonNullable<ReturnType<typeof getDialogueTime>> }) {
	return (
		<time dateTime={time.dateTime} title={time.title}>
			{time.date}
		</time>
	)
}
