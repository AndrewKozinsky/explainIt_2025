import ContentHeaderWithChildren from './ContentHeaderWithChildren'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
	title: 'Shared/UI/Content/ContentHeaderWithChildren',
	component: ContentHeaderWithChildren,
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
		title: 'Экзамен: В кафе',
		hTag: 3,
		children: 'Children',
	},
} satisfies Meta<typeof ContentHeaderWithChildren>

export default meta
type Story = StoryObj<typeof meta>

export const H3: Story = {}
export const H4: Story = { args: { hTag: 4, title: 'Как проходит экзамен' } }
