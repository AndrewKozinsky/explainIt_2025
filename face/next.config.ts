import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
	transpilePackages: ['next-mdx-remote'],
	experimental: {
		// Дисковый кэш Turbopack в Docker на macOS (bind mount) зацикливается и грузит CPU на 500%+
		turbopackFileSystemCacheForDev: false,
	},
}

export default withNextIntl(nextConfig)
