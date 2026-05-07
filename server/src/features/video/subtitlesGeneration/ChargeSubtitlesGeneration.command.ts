import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export class ChargeSubtitlesGenerationCommand implements ICommand {
	constructor(
		public userId: number,
		public durationSec: number,
	) {}
}

@CommandHandler(ChargeSubtitlesGenerationCommand)
export class ChargeSubtitlesGenerationHandler implements ICommandHandler<ChargeSubtitlesGenerationCommand> {
	constructor(
		private readonly userBalanceTransactionRepository: UserBalanceTransactionRepository,
		private readonly mainConfig: MainConfigService,
	) {}

	/**
	 * Charge the user for a completed subtitles generation job.
	 *
	 * amount = ceil(durationSec * pricePerSecondInKopecks * markupMultiplier)
	 *
	 * This happens AFTER a successful ASR round-trip, so the user is never charged for
	 * failed generations. Charging is idempotent at the handler level only to the extent
	 * that BullMQ delivers a job exactly once on success; retries reach this handler only
	 * if the entire pipeline re-runs after a prior failure.
	 */
	async execute(command: ChargeSubtitlesGenerationCommand): Promise<number> {
		const { userId, durationSec } = command

		if (durationSec <= 0) return 0

		const { pricePerSecondInKopecks } = this.mainConfig.get().deepgram
		const { asrMarkupMultiplier } = this.mainConfig.get().generateSubtitles

		const amountInKopecks = Math.max(1, Math.ceil(durationSec * pricePerSecondInKopecks * asrMarkupMultiplier))

		await this.userBalanceTransactionRepository.createCharge({ userId, amountInKopecks })
		return amountInKopecks
	}
}
