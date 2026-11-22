import ContentList from './ContentList'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
	title: 'Shared/UI/Content/ContentList',
	component: ContentList,
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
		size: 'middle',
		ordered: false,
		children: 'Children',
	},
} satisfies Meta<typeof ContentList>

export default meta
type Story = StoryObj<typeof meta>

export const UnorderedMiddle: Story = {}
export const UnorderedSmall: Story = { args: { size: 'small' } }
export const OrderedMiddle: Story = { args: { ordered: true } }
export const OrderedSmall: Story = { args: { ordered: true, size: 'small' } }
