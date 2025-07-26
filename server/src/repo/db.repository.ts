import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import { Prisma } from '@prisma/client'
import { wait } from '../utils/time'

@Injectable()
export class DBRepository {
	constructor(private prisma: PrismaService) {}

	async wrapIntoPrismaTransaction(dto: {
		executableCode: () => Promise<any>
		maxRetries?: number
		isolationLevel?: Prisma.TransactionIsolationLevel
	}) {
		let attempt = 0
		const MAX_RETRIES = dto.maxRetries ?? 5

		const isolationLevel = dto.isolationLevel ?? Prisma.TransactionIsolationLevel.ReadCommitted

		while (attempt < MAX_RETRIES) {
			try {
				return await this.prisma.$transaction(dto.executableCode, {
					isolationLevel,
				})
			} catch (error) {
				attempt++

				if (attempt >= MAX_RETRIES) {
					console.error(`Transaction failed after ${MAX_RETRIES} retries`)
					throw error
				}

				console.warn('Unexpected error:', error)

				// Wait before the next attempt
				await wait(attempt * 100)
			}
		}
	}

	async erase() {
		try {
			await this.prisma.$queryRaw`DO
$$
DECLARE
    r RECORD;
BEGIN
    -- Disable foreign key checks
    EXECUTE 'SET session_replication_role = replica';

    -- Loop through all tables and truncate
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'TRUNCATE TABLE "' || r.tablename || '" RESTART IDENTITY CASCADE';
    END LOOP;

    -- Re-enable foreign key checks
    EXECUTE 'SET session_replication_role = DEFAULT';
END
$$;`

			return true
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.log(err.message)
			}

			return false
		}
	}
}
