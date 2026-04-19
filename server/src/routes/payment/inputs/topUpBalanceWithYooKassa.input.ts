import { Field, InputType, Int } from '@nestjs/graphql'
import { Min } from 'class-validator'

@InputType()
export class TopUpBalanceWithYooKassaInput {
	@Field(() => Int, { description: 'Amount in kopecks' })
	@Min(1)
	amountInKopecks: number
}
