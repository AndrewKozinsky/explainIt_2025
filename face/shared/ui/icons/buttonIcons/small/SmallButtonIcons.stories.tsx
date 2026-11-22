import { iconStoryArgs, iconStoryArgTypes, renderIcon, renderIconGallery } from '../../../../../.storybook/iconStories'
import { EyeClosedSmallButtonIcon } from './EyeClosedSmallButtonIcon'
import { EyeOpenedSmallButtonIcon } from './EyeOpenedSmallButtonIcon'
import { LoadingSmallButtonIcon } from './LoadingSmallButtonIcon'
import { LockSmallButtonIcon } from './LockSmallButtonIcon'
import { MicSmallButtonIcon } from './MicSmallButtonIcon'
import { PlaySmallButtonIcon } from './PlaySmallButtonIcon'
import { StopSmallButtonIcon } from './StopSmallButtonIcon'
import { SuccessSmallButtonIcon } from './SuccessSmallButtonIcon'
import { TextSmallButtonIcon } from './TextSmallButtonIcon'
import { WarningSmallButtonIcon } from './WarningSmallButtonIcon'
import type { IconStoryArgs } from '../../../../../.storybook/iconStories'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
	title: 'Shared/UI/Icons/ButtonIcons/Small',
	render: renderIcon(EyeClosedSmallButtonIcon),
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
	args: iconStoryArgs,
	argTypes: iconStoryArgTypes,
} satisfies Meta<IconStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Gallery: Story = {
	render: renderIconGallery({
		EyeClosedSmallButtonIcon,
		EyeOpenedSmallButtonIcon,
		LoadingSmallButtonIcon,
		LockSmallButtonIcon,
		MicSmallButtonIcon,
		PlaySmallButtonIcon,
		StopSmallButtonIcon,
		SuccessSmallButtonIcon,
		TextSmallButtonIcon,
		WarningSmallButtonIcon,
	}),
}

export const EyeClosed: Story = {
	name: 'EyeClosedSmallButtonIcon',
	render: renderIcon(EyeClosedSmallButtonIcon),
}

export const EyeOpened: Story = {
	name: 'EyeOpenedSmallButtonIcon',
	render: renderIcon(EyeOpenedSmallButtonIcon),
}

export const Loading: Story = {
	name: 'LoadingSmallButtonIcon',
	render: renderIcon(LoadingSmallButtonIcon),
}

export const Lock: Story = {
	name: 'LockSmallButtonIcon',
	render: renderIcon(LockSmallButtonIcon),
}

export const Mic: Story = {
	name: 'MicSmallButtonIcon',
	render: renderIcon(MicSmallButtonIcon),
}

export const Play: Story = {
	name: 'PlaySmallButtonIcon',
	render: renderIcon(PlaySmallButtonIcon),
}

export const Stop: Story = {
	name: 'StopSmallButtonIcon',
	render: renderIcon(StopSmallButtonIcon),
}

export const Success: Story = {
	name: 'SuccessSmallButtonIcon',
	render: renderIcon(SuccessSmallButtonIcon),
}

export const Text: Story = {
	name: 'TextSmallButtonIcon',
	render: renderIcon(TextSmallButtonIcon),
}

export const Warning: Story = {
	name: 'WarningSmallButtonIcon',
	render: renderIcon(WarningSmallButtonIcon),
}
