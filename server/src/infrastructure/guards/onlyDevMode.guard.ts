import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { errorMessage } from '../exceptions/errorMessage'
import { MainConfigService } from '../mainConfig/mainConfig.service'

@Injectable()
export class OnlyDevOrTestingModeGuard implements CanActivate {
	constructor(private mainConfig: MainConfigService) {}

	canActivate(context: ExecutionContext): boolean {
		if (this.mainConfig.get().mode === 'localtest' || this.mainConfig.get().mode === 'localdev') {
			return true
		}

		throw new ForbiddenException(errorMessage.onlyDevMode)
	}
}
