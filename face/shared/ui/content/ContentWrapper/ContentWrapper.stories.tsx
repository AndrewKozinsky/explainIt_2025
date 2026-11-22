import ContentWrapper from './ContentWrapper'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
	title: 'Shared/UI/Content/ContentWrapper',
	component: ContentWrapper,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
	args: {
		children: 'Children',
	},
} satisfies Meta<typeof ContentWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
