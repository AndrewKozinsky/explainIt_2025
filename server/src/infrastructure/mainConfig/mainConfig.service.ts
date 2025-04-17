import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MainConfigService {
	constructor(private configService: ConfigService) {}

	get() {
		const enVariables = this.getEnVariables()

		return {
			mode: enVariables.mode,
			port: enVariables.port,
		}
	}

	getEnVariables() {
		return {
			mode: this.configService.get<string>('mode') as 'dev' | 'serverCheck' | 'server',
			port: this.configService.get<number>('port') || 3001,
		}
	}
}
