import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { CreateBooksPublicCommand } from 'src/features/bookPublic/CreateBooksPublic.command'

@Injectable()
export class StartServerTasksRunner implements OnApplicationBootstrap {
	constructor(private commandBus: CommandBus) {}

	async onApplicationBootstrap() {
		await this.commandBus.execute(new CreateBooksPublicCommand())
	}
}
