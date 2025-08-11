import { CommandBus, ICommand } from '@nestjs/cqrs'
import { SeedTestDataCommand } from '../../src/features/db/SeedTestData.command'

/**
 * Seed database with some data for testing.
 */
export async function seedTestData(commandBus: CommandBus) {
	const command = new SeedTestDataCommand()
	await commandBus.execute(command)
}
