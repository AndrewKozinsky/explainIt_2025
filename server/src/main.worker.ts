import 'dotenv/config'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { WorkerModule } from './worker.module'

/**
 * Entry point for the subtitles generation worker process.
 *
 * We use `createApplicationContext` instead of `create` because the worker
 * does not need to listen on any HTTP/GraphQL port — it just pulls jobs from
 * BullMQ and writes status to Postgres.
 */
async function bootstrapWorker() {
	const app = await NestFactory.createApplicationContext(WorkerModule, {
		logger: ['error', 'warn', 'log'],
	})

	// Keep the process alive until SIGTERM/SIGINT.
	const logger = new Logger('Worker')
	logger.log('ExplainIt worker is up and listening for jobs 🎧')

	const shutdown = async (signal: string) => {
		logger.log(`Received ${signal}, shutting down worker gracefully…`)

		try {
			await app.close()
			process.exit(0)
		} catch (err) {
			logger.error('Error during shutdown', err as Error)
			process.exit(1)
		}
	}

	process.on('SIGINT', () => void shutdown('SIGINT'))
	process.on('SIGTERM', () => void shutdown('SIGTERM'))
}

bootstrapWorker().catch((err) => {
	// eslint-disable-next-line no-console
	console.error('Worker failed to bootstrap', err)
	process.exit(1)
})
