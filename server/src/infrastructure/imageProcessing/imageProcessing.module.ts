import { Module } from '@nestjs/common'
import { ImageProcessingService } from './imageProcessing.service'

@Module({ providers: [ImageProcessingService], exports: [ImageProcessingService] })
export class ImageProcessingModule {}
