import TranslationFeedback from './TranslationFeedback'
import TranslationFeedbackError from './TranslationFeedbackError'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
	title: 'Shared/UI/Content/TranslationFeedback/Error',
	component: TranslationFeedbackError,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
	decorators: [
		(Story) => (
			<TranslationFeedback aria-label='Ошибки перевода' style={{ maxWidth: '40rem' }}>
				<Story />
			</TranslationFeedback>
		),
	],
	args: {
		fragment: 'I went to home.',
		explanation: 'Перед **home** в значении «домой» предлог **to** опускается.',
	},
} satisfies Meta<typeof TranslationFeedbackError>

export default meta
type Story = StoryObj<typeof meta>

export const WithCorrection: Story = {
	args: {
		number: 1,
		replacement: 'I went home.',
	},
}

export const WithExplanationOnly: Story = {}
