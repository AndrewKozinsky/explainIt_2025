import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { TopUpBalanceWithYooKassaCommand } from 'features/payment/TopUpBalanceWithYooKassa.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'
import { TopUpBalanceWithYooKassaOutModel } from 'models/payment/payment.out.model'
import { TopUpBalanceWithYooKassaInput } from './inputs/topUpBalanceWithYooKassa.input'
import { paymentResolversDesc } from './resolverDescriptions'
import { Request } from 'express'

@Resolver()
export class PaymentResolver {
	constructor(private commandBus: CommandBus) {}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => TopUpBalanceWithYooKassaOutModel, {
		name: RouteNames.PAYMENT.YOOKASSA.TOP_UP_BALANCE,
		description: paymentResolversDesc.topUpBalanceWithYooKassa,
	})
	async topUpBalanceWithYooKassa(
		@Args('input') input: TopUpBalanceWithYooKassaInput,
		@Context('req') request: Request,
	) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new TopUpBalanceWithYooKassaCommand(userId, input))
	}
}
