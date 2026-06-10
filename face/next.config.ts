import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
	transpilePackages: ['next-mdx-remote'],
}

export default withNextIntl(nextConfig)
