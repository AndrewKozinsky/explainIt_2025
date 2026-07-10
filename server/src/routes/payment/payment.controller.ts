import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { TopUpBalanceWithYooKassaCommand } from 'features/payment/TopUpBalanceWithYooKassa.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { CreateYooKassaPaymentOutModel } from 'models/payment/payment.out.model'
import { TopUpBalanceWithYooKassaDto } from './dto/top-up-balance-with-yookassa.dto'
import { ApiTopUpBalanceWithYooKassa } from './openAPI.decorators'

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
	constructor(private commandBus: CommandBus) {}

	@ApiTopUpBalanceWithYooKassa()
	@UseGuards(CheckSessionCookieGuard)
	@HttpCode(HttpStatus.OK)
	@Post('top-up-balance')
	async topUpBalanceWithYooKassa(
		@Body() input: TopUpBalanceWithYooKassaDto,
		@Req() request: Request,
	): Promise<CreateYooKassaPaymentOutModel> {
		const userId = request.session.userId!
		return await this.commandBus.execute(new TopUpBalanceWithYooKassaCommand(userId, input))
	}
}
