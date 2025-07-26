import { request } from '@playwright/test'
import { consts } from './common'

export const server = {
	// Clear the database
	async clearDB() {
		const apiContext = await request.newContext()
		await apiContext.delete(consts.serverUrl + '/testing/all-data')
	},
	// Seed test data
	async seedTestData() {
		const apiContext = await request.newContext()
		await apiContext.post(consts.serverUrl + '/testing/seed')
	},
	/*getUserByEmail(userEmail: string) {
		return cy.request({
			method: 'GET',
			url: consts.serverUrl + '/testing/user/',
			qs: { email: userEmail },
		})
	},*/
}
