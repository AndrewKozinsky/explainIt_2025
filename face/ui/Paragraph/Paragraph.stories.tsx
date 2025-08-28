import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Paragraph from './Paragraph'

const meta = {
	title: 'UI/Paragraph',
	component: Paragraph,
} satisfies Meta<typeof Paragraph>

export default meta
type Story = StoryObj<typeof meta>

const FONT_SIZES: Array<14 | 15 | 16 | 18 | 20> = [14, 15, 16, 18, 20]

export const AllVariants: Story = {
	args: {
		fontSize: '14',
		children: 'Hello World',
	},
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', containerType: 'inline-size' }}>
			{FONT_SIZES.map((size) => (
				<Paragraph key={size} fontSize={size}>
					{size} Чтение книг — это один из самых интересных способов изучать новые слова и привыкать к
					принципам построения предложений на изучаемом языке. Но чем ниже ваш уровень, тем меньше выбора у
					вас есть потому что если есть много незнакомых слов и языковых конструкций, то чтение таких книг
					будет настоящим мучением потому что придётся тратить уйму усилий на перевод незнакомых слов.
				</Paragraph>
			))}
		</div>
	),
}
