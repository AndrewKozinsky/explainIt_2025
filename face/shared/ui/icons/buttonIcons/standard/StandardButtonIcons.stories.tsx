import { iconStoryArgs, iconStoryArgTypes, renderIcon, renderIconGallery } from '../../../../../.storybook/iconStories'
import { ActionButtonIcon } from './ActionButtonIcon'
import { ActionIcon } from './ActionIcon'
import ArrowRightPureButtonIcon from './ArrowRightPureButtonIcon'
import ArrowUpPureButtonIcon from './ArrowUpPureButtonIcon'
import CheckButtonIcon from './CheckButtonIcon'
import { CopyButtonIcon } from './CopyButtonIcon'
import DeepseekButtonIcon from './DeepseekButtonIcon'
import DeepseekLiteButtonIcon from './DeepseekLiteButtonIcon'
import { DictionaryButtonIcon } from './DictionaryButtonIcon'
import { EditButtonIcon } from './EditButtonIcon'
import { ExitButtonIcon } from './ExitButtonIcon'
import { FullScreenButtonIcon } from './FullScreenButtonIcon'
import GeminiButtonIcon from './GeminiButtonIcon'
import GeminiLiteButtonIcon from './GeminiLiteButtonIcon'
import { GitHubButtonIcon } from './GitHubButtonIcon'
import { GoogleButtonIcon } from './GoogleButtonIcon'
import { ImageButtonIcon } from './ImageButtonIcon'
import { LockButtonIcon } from './LockButtonIcon'
import { MessageButtonIcon } from './MessageButtonIcon'
import MicButtonIcon from './MicButtonIcon'
import OpenAIButtonIcon from './OpenAIButtonIcon'
import OpenAILiteButtonIcon from './OpenAILiteButtonIcon'
import { SettingsButtonIcon } from './SettingsButtonIcon'
import SquareButtonIcon from './SquareButtonIcon'
import StopRecordingButtonIcon from './StopRecordingButtonIcon'
import { TrashButtonIcon } from './TrashButtonIcon'
import { WalletButtonIcon } from './WalletButtonIcon'
import { YandexButtonIcon } from './YandexButtonIcon'
import type { IconStoryArgs } from '../../../../../.storybook/iconStories'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
	title: 'Shared/UI/Icons/ButtonIcons/Standard',
	render: renderIcon(ActionButtonIcon),
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
	args: iconStoryArgs,
	argTypes: iconStoryArgTypes,
} satisfies Meta<IconStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Gallery: Story = {
	render: renderIconGallery({
		ActionButtonIcon,
		ActionIcon,
		ArrowRightPureButtonIcon,
		ArrowUpPureButtonIcon,
		CheckButtonIcon,
		CopyButtonIcon,
		DeepseekButtonIcon,
		DeepseekLiteButtonIcon,
		DictionaryButtonIcon,
		EditButtonIcon,
		ExitButtonIcon,
		FullScreenButtonIcon,
		GeminiButtonIcon,
		GeminiLiteButtonIcon,
		GitHubButtonIcon,
		GoogleButtonIcon,
		ImageButtonIcon,
		LockButtonIcon,
		MessageButtonIcon,
		MicButtonIcon,
		OpenAIButtonIcon,
		OpenAILiteButtonIcon,
		SettingsButtonIcon,
		SquareButtonIcon,
		StopRecordingButtonIcon,
		TrashButtonIcon,
		WalletButtonIcon,
		YandexButtonIcon,
	}),
}

export const Action: Story = {
	name: 'ActionButtonIcon',
	render: renderIcon(ActionButtonIcon),
}

export const ActionAlternate: Story = {
	name: 'ActionIcon',
	render: renderIcon(ActionIcon),
}

export const ArrowRightPure: Story = {
	name: 'ArrowRightPureButtonIcon',
	render: renderIcon(ArrowRightPureButtonIcon),
}

export const ArrowUpPure: Story = {
	name: 'ArrowUpPureButtonIcon',
	render: renderIcon(ArrowUpPureButtonIcon),
}

export const Check: Story = {
	name: 'CheckButtonIcon',
	render: renderIcon(CheckButtonIcon),
}

export const Deepseek: Story = {
	name: 'DeepseekButtonIcon',
	render: renderIcon(DeepseekButtonIcon),
}

export const DeepseekLite: Story = {
	name: 'DeepseekLiteButtonIcon',
	render: renderIcon(DeepseekLiteButtonIcon),
}

export const Edit: Story = {
	name: 'EditButtonIcon',
	render: renderIcon(EditButtonIcon),
}

export const Exit: Story = {
	name: 'ExitButtonIcon',
	render: renderIcon(ExitButtonIcon),
}

export const Gemini: Story = {
	name: 'GeminiButtonIcon',
	render: renderIcon(GeminiButtonIcon),
}

export const GeminiLite: Story = {
	name: 'GeminiLiteButtonIcon',
	render: renderIcon(GeminiLiteButtonIcon),
}

export const Google: Story = {
	name: 'GoogleButtonIcon',
	render: renderIcon(GoogleButtonIcon),
}

export const GitHub: Story = {
	name: 'GitHubButtonIcon',
	render: renderIcon(GitHubButtonIcon),
}

export const Mic: Story = {
	name: 'MicButtonIcon',
	render: renderIcon(MicButtonIcon),
}

export const OpenAI: Story = {
	name: 'OpenAIButtonIcon',
	render: renderIcon(OpenAIButtonIcon),
}

export const OpenAILite: Story = {
	name: 'OpenAILiteButtonIcon',
	render: renderIcon(OpenAILiteButtonIcon),
}

export const Square: Story = {
	name: 'SquareButtonIcon',
	render: renderIcon(SquareButtonIcon),
}

export const StopRecording: Story = {
	name: 'StopRecordingButtonIcon',
	render: renderIcon(StopRecordingButtonIcon),
}

export const Trash: Story = {
	name: 'TrashButtonIcon',
	render: renderIcon(TrashButtonIcon),
}

export const Yandex: Story = {
	name: 'YandexButtonIcon',
	render: renderIcon(YandexButtonIcon),
}

export const Wallet: Story = {
	name: 'WalletButtonIcon',
	render: renderIcon(WalletButtonIcon),
}

export const FullScreen: Story = {
	name: 'FullScreenButtonIcon',
	render: renderIcon(FullScreenButtonIcon),
}

export const Image: Story = {
	name: 'ImageButtonIcon',
	render: renderIcon(ImageButtonIcon),
}

export const Dictionary: Story = {
	name: 'DictionaryButtonIcon',
	render: renderIcon(DictionaryButtonIcon),
}

export const Message: Story = {
	name: 'MessageButtonIcon',
	render: renderIcon(MessageButtonIcon),
}

export const Settings: Story = {
	name: 'SettingsButtonIcon',
	render: renderIcon(SettingsButtonIcon),
}

export const Copy: Story = {
	name: 'CopyButtonIcon',
	render: renderIcon(CopyButtonIcon),
}

export const Lock: Story = {
	name: 'LockButtonIcon',
	render: renderIcon(LockButtonIcon),
}
