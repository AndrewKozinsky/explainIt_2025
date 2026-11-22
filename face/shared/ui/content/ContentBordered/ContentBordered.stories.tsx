import ContentBordered from './ContentBordered'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
	title: 'Shared/UI/Content/ContentBordered',
	component: ContentBordered,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '36rem' }}>
				<Story />
			</div>
		),
	],
	args: {
		children: 'Children',
	},
} satisfies Meta<typeof ContentBordered>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {}
