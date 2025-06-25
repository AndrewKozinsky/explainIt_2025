import { Global, Module } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { EmailAdapterService, EmailAdapterServiceMock } from './email-adapter.service'

const emailServiceProvider = {
	provide: EmailAdapterService,
	useFactory: (mainConfigService: MainConfigService) => {
		return mainConfigService.get().mode === 'localtest'
			? new EmailAdapterServiceMock()
			: new EmailAdapterService(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [emailServiceProvider],
	exports: [EmailAdapterService],
})
export class EmailAdapterModule {}
