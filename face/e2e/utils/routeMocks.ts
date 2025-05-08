import { Page } from '@playwright/test'
import pagesUrls from './pagesUrls'

export const graphQLRequestsData = {
	AICheckTranslation: {
		operationName: 'AICheckTranslation',
		dataKey: 'ai_checkTranslation',
		data: {
			error(data = { error: 'some error' }) {
				return {
					...data,
					__typename: 'ErrorResult',
				}
			},
			wrongTranslation(data = { correct: false, analysis: 'Test translation is incorrect' }) {
				return {
					...data,
					__typename: 'SuccessResult',
				}
			},
			correctTranslation(data = { correct: true, analysis: 'Test translation is correct' }) {
				return {
					...data,
					__typename: 'SuccessResult',
				}
			},
		},
	},
}

export async function mockGraphQLRequest(
	page: Page,
	operation: (typeof graphQLRequestsData)[keyof typeof graphQLRequestsData],
	response: any,
	delay?: number,
) {
	await page.route(pagesUrls.graphql, async (route, request) => {
		const postData = request.postDataJSON()

		// Match specific operation
		if (postData.operationName === operation.operationName) {
			if (delay) {
				// Simulate delay (e.g., 1 second)
				await new Promise((resolve) => setTimeout(resolve, delay))
			}

			await route.fulfill({
				contentType: 'application/json',
				body: JSON.stringify({
					data: {
						[operation.dataKey]: response,
					},
				}),
			})
		} else {
			await route.continue() // Let others pass through
		}
	})
}
