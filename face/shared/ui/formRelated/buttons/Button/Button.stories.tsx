import { NextIntlClientProvider } from 'next-intl'
import { fn } from 'storybook/test'
import CheckButtonIcon from '@/shared/ui/icons/buttonIcons/standard/CheckButtonIcon'
import Button from './Button'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
	title: 'Shared/UI/FormRelated/Buttons/Button',
	component: Button,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	decorators: [
		(Story, context) => (
			<NextIntlClientProvider locale='en' messages={{}}>
				<div
					style={{
						padding: '2rem',
						backgroundColor: context.args.colorScheme === 'light' ? '#232323' : '#fff',
					}}
				>
					<Story />
				</div>
			</NextIntlClientProvider>
		),
	],
	args: {
		children: 'Button',
		theme: 'regular',
		colorScheme: 'dark',
		size: 'medium',
		rounded: false,
		disabled: false,
		loading: false,
		onClick: fn(),
	},
	argTypes: {
		children: { control: 'text' },
		theme: { control: 'select', options: ['regular', 'danger', 'accent', 'plain', 'outline'] },
		colorScheme: { control: 'inline-radio', options: ['dark', 'light'] },
		size: { control: 'select', options: ['small', 'medium', 'big'] },
		icon: { control: false },
		href: { control: 'text' },
	},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Regular: Story = {}
export const Accent: Story = { args: { theme: 'accent' } }
export const Danger: Story = { args: { theme: 'danger' } }
export const Plain: Story = { args: { theme: 'plain' } }
export const Outline: Story = { args: { theme: 'outline' } }

export const Small: Story = { args: { size: 'small' } }
export const Big: Story = { args: { size: 'big' } }
export const Rounded: Story = { args: { rounded: true } }
export const Light: Story = { args: { colorScheme: 'light' } }
export const Disabled: Story = { args: { disabled: true } }
export const Loading: Story = { args: { loading: true, children: 'Loading' } }

export const WithIcon: Story = {
	args: { icon: <CheckButtonIcon />, children: 'Confirm' },
}

export const WithImageIcon: Story = {
	args: { icon: '/icons/plusButtonIcon.svg', children: 'Add' },
}

export const IconOnly: Story = {
	args: { icon: <CheckButtonIcon />, children: undefined, 'aria-label': 'Confirm' },
}

export const Link: Story = {
	args: { href: '/', children: 'Home' },
}
