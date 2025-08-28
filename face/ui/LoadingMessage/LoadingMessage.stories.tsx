import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import LoadingMessage from './LoadingMessage'

const meta = {
	title: 'UI/LoadingMessage',
	component: LoadingMessage,
} satisfies Meta<typeof LoadingMessage>

export default meta
type Story = StoryObj<typeof meta>

const FONT_SIZES: Array<14 | 15 | 16 | 18 | 20> = [14, 15, 16, 18, 20]

export const Main: Story = {
	args: {
		text: 'Hello World',
	},
	render: (args) => <LoadingMessage {...args} />,
}
