import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
// import { CustomRestError } from '../exceptions/customErrors'
// import { ErrorCode } from '../exceptions/errorCode'
import { errorMessage } from '../exceptions/errorMessage'
import { MainConfigService } from '../mainConfig/mainConfig.service'

@Injectable()
export class OnlyDevOrTestingModeGuard implements CanActivate {
	constructor(private mainConfig: MainConfigService) {}

	canActivate(context: ExecutionContext): boolean {
		if (this.mainConfig.get().mode === 'localtest' || this.mainConfig.get().mode === 'localdev') {
			return true
		}

		// throw new CustomRestError(errorMessage.onlyDevMode, ErrorCode.BadRequest_400)
		return true
	}
}
