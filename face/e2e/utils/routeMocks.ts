import { Page } from '@playwright/test'
import { wait } from '../../utils/utils'
import pagesUrls from './pagesUrls'

export const graphQLRequestsData = {
	AICheckTranslation: {
		operationName: 'AICheckTranslation',
		dataKey: 'ai_checkTranslation',
		data: {
			error(data = { error: 'some error' }) {
				return {
					...data,
					__typename: 'CheckTranslationOutErrorModel',
				}
			},
			wrongTranslation(data = { correct: false, analysis: 'Test translation is incorrect' }) {
				return {
					...data,
					__typename: 'CheckTranslationOutSuccessModel',
				}
			},
			correctTranslation(data = { correct: true, analysis: 'Test translation is correct' }) {
				return {
					...data,
					__typename: 'CheckTranslationOutSuccessModel',
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
				await wait(delay)
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
