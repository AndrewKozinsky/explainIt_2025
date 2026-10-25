import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const directory = fileURLToPath(new URL('.', import.meta.url))
const face = fileURLToPath(new URL('../../../', import.meta.url))
export default defineConfig({
	root: directory,
	// Корень стенда — fixtures; статические файлы приложения (например логотип) лежат в face/public.
	publicDir: `${face}public`,
	resolve: {
		alias: [
			{ find: '@/i18n/routing', replacement: `${directory}routing.tsx` },
			{ find: '@', replacement: face },
		],
	},
	esbuild: { jsx: 'automatic' },
	server: { fs: { allow: [face] } },
})
