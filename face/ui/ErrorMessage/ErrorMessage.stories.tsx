import ErrorMessage from './ErrorMessage'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
	title: 'UI/ErrorMessage',
	component: ErrorMessage,
} satisfies Meta<typeof ErrorMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
	args: {
		text: '',
	},
	render: () => <ErrorMessage text='My error message' />,
}
