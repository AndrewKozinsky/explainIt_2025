import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Switcher from 'ui/Switcher/Switcher'

const meta = {
	title: 'UI/Switcher',
	component: Switcher,
} satisfies Meta<typeof Switcher>

export default meta
type Story = StoryObj<typeof meta>

const items = [
	{
		text: 'Item 1',
		onClick: () => {},
		isCurrent: true,
	},
	{
		text: 'Item 2',
		onClick: () => {},
		isCurrent: false,
	},
	{
		text: 'Item 3',
		onClick: () => {},
		isCurrent: false,
	},
]

const orientations: ('horizontal' | 'vertical')[] = ['horizontal', 'vertical']

export const AllVariants: Story = {
	args: {
		items,
		orientation: 'horizontal',
	},
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', containerType: 'inline-size' }}>
			{orientations.map((orientation) => {
				return <Switcher orientation={orientation} items={items} />
			})}
		</div>
	),
}
