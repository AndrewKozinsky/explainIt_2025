// Row-major order mirrors server/src/types/aiDialogueMessage.ts and emotion-grid-4x3-v1.
const emotions = [
	'neutral',
	'happy',
	'sad',
	'angry',
	'surprised',
	'confused',
	'worried',
	'embarrassed',
	'thoughtful',
	'skeptical',
	'relieved',
	'encouraging',
]

export function getEmotionCell(emotion?: string) {
	const index = Math.max(0, emotions.indexOf(emotion ?? 'neutral'))
	return { column: index % 4, row: Math.floor(index / 4) }
}
