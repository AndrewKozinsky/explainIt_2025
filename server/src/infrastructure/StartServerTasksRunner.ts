import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { CreateBooksPublicCommand } from 'features/bookPublic/CreateBooksPublic.command'
import { promisify } from 'util'

@Injectable()
export class StartServerTasksRunner implements OnApplicationBootstrap {
	constructor(private commandBus: CommandBus) {}

	async onApplicationBootstrap() {
		await this.runMigrations()
		await this.commandBus.execute(new CreateBooksPublicCommand())
	}

	private async runMigrations() {
		const { exec: cpExec } = await import('child_process')
		const exec = promisify(cpExec)
		await exec('npx prisma migrate deploy')
	}
}
