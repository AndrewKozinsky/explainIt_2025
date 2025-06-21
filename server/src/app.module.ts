import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GigaChatModule } from './infrastructure/gigaChat/gigaChat.module'
import { MainConfigModule } from './infrastructure/mainConfig/mainConfig.module'
import { MainConfigService } from './infrastructure/mainConfig/mainConfig.service'
import { join } from 'path'
import { AiModule } from './routes/ai/ai.module'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { TelegramModule } from './infrastructure/telegram/telegram.module'
import {AuthModule} from './routes/auth/auth.module'

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
					// graphiql: mainConfigService.get().mode === 'localDev',
					playground: false,
					plugins: [ApolloServerPluginLandingPageLocalDefault()],
				}
			},
			inject: [MainConfigService],
		}),
		MainConfigModule,
		AiModule,
		AuthModule,
		TelegramModule,
		GigaChatModule,
	],
	providers: [],
})
export class AppModule {}
