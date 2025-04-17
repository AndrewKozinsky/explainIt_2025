import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MainConfigModule } from './infrastructure/mainConfig/mainConfig.module'
import { MainConfigService } from './infrastructure/mainConfig/mainConfig.service'
import { join } from 'path'
import { AiModule } from './routes/ai/ai.module'

@Module({
	imports: [
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			imports: [MainConfigModule],
			useFactory: (mainConfigService: MainConfigService) => {
				return {
					definitions: {
						path: join(process.cwd(), 'src/graphql.ts'),
					},
					autoSchemaFile: true,
				}
			},
			inject: [MainConfigService],
		}),
		MainConfigModule,
		AiModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
