import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import FAQ from './FAQ'

const meta = {
	title: 'UI/FAQ',
	component: FAQ,
} satisfies Meta<typeof FAQ>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
	args: {
		config: [
			{
				question: { type: 'plain', value: 'What is Storybook?' },
				answer: { type: 'plain', value: ['Storybook is a tool for building UI components in isolation.'] },
			},
			{
				question: { type: 'plain', value: 'How do I use Storybook?' },
				answer: {
					type: 'plain',
					value: [
						'You can use Storybook by adding it to your project and creating stories for your components.',
					],
				},
			},
		],
	},
	render: (args) => <FAQ {...args} />,
}
