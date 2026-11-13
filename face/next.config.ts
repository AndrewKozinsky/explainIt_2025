import createNextIntlPlugin from 'next-intl/plugin'
import { posthogConfig } from './shared/posthog/posthogConfig'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
	transpilePackages: ['next-mdx-remote'],
	// Пересылка запросов PostHog через свой домен, чтобы их не резали блокировщики рекламы.
	async rewrites() {
		return [
			{
				source: `${posthogConfig.proxyPath}/static/:path*`,
				destination: `${posthogConfig.assetsHost}/static/:path*`,
			},
			{
				source: `${posthogConfig.proxyPath}/:path*`,
				destination: `${posthogConfig.ingestHost}/:path*`,
			},
		]
	},
	// API PostHog использует адреса со слешем на конце; без этого Next.js перенаправил бы их.
	skipTrailingSlashRedirect: true,
	experimental: {
		// Дисковый кэш Turbopack в Docker на macOS (bind mount) зацикливается и грузит CPU на 500%+
		turbopackFileSystemCacheForDev: false,
	},
}

export default withNextIntl(nextConfig)
