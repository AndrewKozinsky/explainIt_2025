'use client'

import { useState, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type ProvidersProps = {
	children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// User data changes rarely — keep it fresh for 5 minutes
						staleTime: 5 * 60 * 1000,
					},
				},
			}),
	)

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
