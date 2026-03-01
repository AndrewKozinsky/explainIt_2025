import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const mode = process.env.MODE ?? '';
const siteUrl = mode.startsWith('server') ? 'https://explainit.ru' : 'http://localhost';

const config: Config = {
	title: 'ExplainIt — Справка',
	tagline: 'Документация',
	favicon: 'img/logo.svg',
	url: siteUrl,
	baseUrl: '/help/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	i18n: {
		defaultLocale: 'ru',
		locales: ['ru'],
	},
	presets: [
		[
			'classic',
			{
				docs: {
					path: 'content/docs',
					routeBasePath: '/',
					sidebarPath: './sidebars.ts',
				},
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],
	themeConfig: {
		navbar: {
			title: '',
			items: [
				{
					label: 'Explainit.ru',
					href: `${siteUrl}/`,
					target: '_self',
					position: 'left',
				},
			],
		},
		footer: {
			style: 'dark',
			copyright: `Copyright © ${new Date().getFullYear()} ExplainIt`,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
