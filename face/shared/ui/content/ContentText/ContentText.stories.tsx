import ContentText from './ContentText'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
	title: 'Shared/UI/Content/ContentText',
	component: ContentText,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '36rem' }}>
				<Story />
			</div>
		),
	],
	args: { size: 'middle', children: 'Children' },
} satisfies Meta<typeof ContentText>

export default meta
type Story = StoryObj<typeof meta>

export const Middle: Story = {}
export const Small: Story = { args: { size: 'small' } }
