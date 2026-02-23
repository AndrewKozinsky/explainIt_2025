import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { Request } from 'express'
import { BuySubscriptionWithYooKassaCommand } from 'features/payment/BuySubscriptionWithYooKassa.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'
import { BuySubscriptionWithYooKassaOutModel } from 'models/payment/payment.out.model'
import { BuySubscriptionWithYooKassaInput } from './inputs/buySubscriptionWithYooKassa.input'
import { paymentResolversDesc } from './resolverDescriptions'

@Resolver()
export class PaymentResolver {
	constructor(private commandBus: CommandBus) {}

	@UseGuards(CheckSessionCookieGuard)
	@Mutation(() => BuySubscriptionWithYooKassaOutModel, {
		name: RouteNames.PAYMENT.YOOKASSA.BUY_SUBSCRIPTION,
		description: paymentResolversDesc.buySubscriptionWithYooKassa,
	})
	async buySubscriptionWithYooKassa(
		@Args('input') input: BuySubscriptionWithYooKassaInput,
		@Context('req') request: Request,
	) {
		const userId = request.session.userId!
		return await this.commandBus.execute(new BuySubscriptionWithYooKassaCommand(userId, input))
	}
}
