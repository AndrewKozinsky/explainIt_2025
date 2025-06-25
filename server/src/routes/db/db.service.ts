import { Injectable } from '@nestjs/common'
import {DBRepository} from '../../repo/db.repository'

@Injectable()
export class DbService {
	constructor(private dbRepository: DBRepository) {}

	async drop() {
		try {
			await this.dbRepository.erase()
			return true
		} catch (error) {
			return false
		}
	}
}
