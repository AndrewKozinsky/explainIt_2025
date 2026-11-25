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
		type: 'dots',
		children: (
			<>
				<li>Прочитайте текст.</li>
				<li>Переведите его и проверьте, сохранился ли смысл исходного текста.</li>
			</>
		),
	},
} satisfies Meta<typeof ContentList>

export default meta
type Story = StoryObj<typeof meta>

export const DotsMiddle: Story = {}
export const DotsSmall: Story = { args: { size: 'small' } }
export const NumbersMiddle: Story = { args: { type: 'numbers' } }
export const NumbersSmall: Story = { args: { type: 'numbers', size: 'small' } }
export const CheckMarksMiddle: Story = { args: { type: 'checkMarks' } }
export const CheckMarksSmall: Story = { args: { type: 'checkMarks', size: 'small' } }
