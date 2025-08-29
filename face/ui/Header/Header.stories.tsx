import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Header from './Header'

const meta = {
	title: 'UI/Header',
	component: Header,
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const hStyle_SIZES: Array<1 | 2 | 3 | 4> = [1, 2, 3, 4]

export const AllVariants: Story = {
	args: {
		children: 'Hello World',
	},
	render: (args) => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', containerType: 'inline-size' }}>
			{hStyle_SIZES.map((size) => (
				<Header hStyle={size}>Чтение книг — это один из самых интересных способов изучать новые слова</Header>
			))}
		</div>
	),
}
