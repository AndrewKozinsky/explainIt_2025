import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
// import { GqlArgumentsHost } from '@nestjs/graphql'
// import { ApolloError } from 'apollo-server-express'

@Catch()
export class ApolloExceptionFilter implements ExceptionFilter {}
