import AiDialogueExamInfo from '@/widgets/aiDialogueExam/AiDialogueExamInfo'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
const meta = {
	title: 'Shared/UI/Content/Composition',
	component: AiDialogueExamInfo,
	args: {
		scenario: {
			title: 'В кафе',
			conversationIdeas: [
				'Узнайте, какие блюда и напитки есть в меню.',
				'Попросите рекомендацию и объясните свои предпочтения.',
			],
		},
	},
	parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AiDialogueExamInfo>
export default meta
type Story = StoryObj<typeof meta>
export const ExamInfo: Story = {
	decorators: [
		(Story) => (
			<div style={{ width: '40rem', maxWidth: '100%', padding: '2rem', boxSizing: 'border-box' }}>
				<Story />
			</div>
		),
	],
}
export const Narrow: Story = {
	decorators: [
		(Story) => (
			<div style={{ width: '28rem', maxWidth: '100%', padding: '1.2rem', boxSizing: 'border-box' }}>
				<Story />
			</div>
		),
	],
}
