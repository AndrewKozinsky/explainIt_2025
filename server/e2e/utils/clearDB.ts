import { HttpStatus, INestApplication } from '@nestjs/common'
import { agent as request } from 'supertest'
import RouteNames from '../../src/infrastructure/routeNames'

export async function clearAllDB(app: INestApplication<any>) {
	await request(app.getHttpServer())
		.delete('/' + RouteNames.DB.ALL_DATA)
		.expect(HttpStatus.NO_CONTENT)
}
