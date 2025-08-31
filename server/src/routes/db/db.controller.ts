import { BadRequestException, Controller, Delete, Post, HttpCode, HttpStatus, Res, UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Response } from 'express'
import { SeedTestDataCommand } from 'features/db/SeedTestData.command'
import { OnlyDevOrTestingModeGuard } from 'infrastructure/guards/onlyDevMode.guard'
import RouteNames from 'infrastructure/routeNames'
import { DbService } from './db.service'

@Controller()
export class DbController {
	constructor(
		private commandBus: CommandBus,
		private testsService: DbService,
	) {}

	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(OnlyDevOrTestingModeGuard)
	@Delete(RouteNames.DB.ALL_DATA)
	async deleteAllData(@Res() res: Response) {
		const isDropped = await this.testsService.drop()

		if (isDropped) {
			res.sendStatus(HttpStatus.NO_CONTENT)
			return
		}

		throw new BadRequestException()
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(OnlyDevOrTestingModeGuard)
	@Post(RouteNames.DB.SEED)
	async seedTestData() {
		await this.commandBus.execute(new SeedTestDataCommand())
	}
}
