import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MainConfigService } from './mainConfig.service'

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				'.env.localtest',
				'.env.localdev',
				'.env.localcheckserver',
				'.env.serverdevelop',
				'.env.servermaster',
				'.env',
			],
		}),
	],
	providers: [MainConfigService],
	exports: [MainConfigService],
})
export class MainConfigModule {}
