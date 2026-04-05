import { promisify } from 'util'
import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { CreatePublicBooksCommand } from 'features/bookPublic/CreatePublicBooks.command'
import { CreateTariffsCommand } from 'features/tariff/CreateTariffs.command'
import { CreatePublicVideosCommand } from 'features/video/CreatePublicVideos.command'
// import { SeedVoicesCommand } from 'features/voice/SeedVoices.command'

@Injectable()
export class StartServerTasksRunner implements OnApplicationBootstrap {
	constructor(private commandBus: CommandBus) {}

	async onApplicationBootstrap() {
		await this.runMigrations()
		await this.commandBus.execute(new CreatePublicBooksCommand())
		await this.commandBus.execute(new CreatePublicVideosCommand())
		await this.commandBus.execute(new CreateTariffsCommand())
		// await this.commandBus.execute(new SeedVoicesCommand())
	}

	private async runMigrations() {
		const { exec: cpExec } = await import('child_process')
		const exec = promisify(cpExec)
		await exec('npx prisma migrate deploy')
	}
}
