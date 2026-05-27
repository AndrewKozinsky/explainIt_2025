import { promisify } from 'util'
import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { CreatePublicBooksCommand } from 'features/bookPublic/CreatePublicBooks.command'
import { SyncMdxGrammarConceptsCommand } from 'features/grammarConcept/SyncMdxGrammarConcepts.command'
import { CreatePublicVideosCommand } from 'features/video/CreatePublicVideos.command'

@Injectable()
export class StartServerTasksRunner implements OnApplicationBootstrap {
	constructor(private commandBus: CommandBus) {}

	async onApplicationBootstrap() {
		await this.runMigrations()
		await this.commandBus.execute(new CreatePublicBooksCommand())
		await this.commandBus.execute(new CreatePublicVideosCommand())
		await this.commandBus.execute(new SyncMdxGrammarConceptsCommand())
	}

	private async runMigrations(attemptsLeft = 10, delayMs = 3000): Promise<void> {
		const { exec: cpExec } = await import('child_process')
		const exec = promisify(cpExec)

		try {
			await exec('npx prisma migrate deploy')
		} catch (err: any) {
			if (attemptsLeft <= 1) throw err

			console.warn(
				`[StartServerTasksRunner] Migration failed, retrying in ${delayMs}ms... (${attemptsLeft - 1} attempts left)\n${err?.stderr || err?.message}`,
			)
			await new Promise((resolve) => setTimeout(resolve, delayMs))
			await this.runMigrations(attemptsLeft - 1, delayMs)
		}
	}
}
