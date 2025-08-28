import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { publicFolderFilesUrls } from '../../../../utils/publicFolderFilesUrls'
import Button from './Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'UI/Button',
	component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'start', gap: '1rem' }}>
			<Button theme='regular'>Regular</Button>
			<Button theme='danger'>Danger</Button>
			<Button theme='regular' disabled>
				Regular disabled
			</Button>
			<Button theme='danger' disabled>
				Danger disabled
			</Button>
			<Button theme='regular' icon={publicFolderFilesUrls.icons.githubButtonIcon}>
				Github
			</Button>
			<Button theme='regular' loading>
				Regular
			</Button>
		</div>
	),
}
