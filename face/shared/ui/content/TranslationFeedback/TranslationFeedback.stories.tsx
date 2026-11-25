import TranslationFeedback from './TranslationFeedback'
import TranslationFeedbackError from './TranslationFeedbackError'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
	title: 'Shared/UI/Content/TranslationFeedback/List',
	component: TranslationFeedback,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '40rem' }}>
				<Story />
			</div>
		),
	],
	args: { 'aria-label': 'Ошибки перевода' },
} satisfies Meta<typeof TranslationFeedback>

export default meta
type Story = StoryObj<typeof meta>

export const WithErrors: Story = {
	render: (args) => (
		<TranslationFeedback {...args}>
			<TranslationFeedbackError
				number={1}
				fragment='I has a ticket.'
				replacement='I have a ticket.'
				explanation='С местоимением **I** используется форма **have**.'
			/>
			<TranslationFeedbackError
				number={2}
				fragment='I go to work by the bus.'
				replacement='I go to work by bus.'
				explanation='В выражении **by bus** артикль опускается.'
			/>
		</TranslationFeedback>
	),
}
