import 'dotenv/config'
import { Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { CloudflareS3Module } from 'infrastructure/cloudflareS3/cloudflareS3.module'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigModule } from 'infrastructure/mainConfig/mainConfig.module'
import { CheckAiDialogueImageAssets } from './CheckAiDialogueImageAssets.service'

// Deliberately excludes AppModule/WorkerModule: no Prisma, Redis, schedules or paid jobs.
@Module({
	imports: [MainConfigModule, CloudflareS3Module],
	providers: [CheckAiDialogueImageAssets],
})
class DialogueImageAssetsCheckModule {}

/** Запускает read-only проверку в отдельном контексте и освобождает S3-клиент даже при ошибке. */
export async function checkDialogueImageAssets(): Promise<void> {
	const app = await NestFactory.createApplicationContext(DialogueImageAssetsCheckModule, {
		logger: false,
		abortOnError: false,
	})

	const storage = app.get(CloudflareS3Service)

	try {
		const report = await app.get(CheckAiDialogueImageAssets).checkSharedImageAssets()
		console.log(JSON.stringify(report, null, 2))
		process.exitCode = report.ready ? 0 : 1
	} finally {
		storage.s3.destroy()
		await app.close()
	}
}

if (require.main === module) {
	checkDialogueImageAssets().catch((error: unknown) => {
		// Only an allowlisted variable name is safe to print; SDK errors may contain credentials.
		const missingVariable =
			error instanceof Error
				? /^Env variable ([a-zA-Z][a-zA-Z0-9]*) is empty!$/.exec(error.message)?.[1]
				: undefined

		console.error(
			missingVariable
				? `Dialogue image assets check could not start: missing server configuration ${missingVariable}.`
				: 'Dialogue image assets check could not start or complete. Verify the server environment configuration.',
		)

		process.exitCode = 1
	})
}
