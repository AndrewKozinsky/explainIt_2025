import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class TopUpBalanceWithYooKassaDto {
	@DtoFieldDecorators('amountInKopecks', bdConfig.Payment.dtoProps.amountInKopecks)
	amountInKopecks: number
}
