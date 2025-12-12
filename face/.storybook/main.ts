// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from '@storybook/nextjs-vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
	stories: ['../ui/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@chromatic-com/storybook',
		'@storybook/addon-docs',
		'@storybook/addon-onboarding',
		'@storybook/addon-a11y',
		'@storybook/addon-vitest',
	],
	framework: {
		name: '@storybook/nextjs-vite',
		options: {},
	},
	staticDirs: ['../public'],
	viteFinal: async (config) => {
		config.resolve = config.resolve || {}
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'@': resolve(__dirname, '..'),
		}
		return config
	},
}
export default config
