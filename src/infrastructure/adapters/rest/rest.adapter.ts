import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AppLogger } from '../../logging/app-logger.service';
import { TransformationSchema } from '../../validation/transformation.schema';
import { TransportFactory } from '../transport/transport.factory';
import { TransformationRequest } from '../../../domain/entities/transformation-request.entity';

@Controller('transform')
export class RestAdapter {
  private readonly MAX_CONTENT_SIZE = 10000; // Example threshold

  constructor(
    private readonly transportFactory: TransportFactory,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(RestAdapter.name);
  }

  @Post()
  async transform(@Body() body: any) {
    const { error, value } = TransformationSchema.validate(body);
    if (error) {
      throw new HttpException(`Validation failed: ${error.message}`, HttpStatus.BAD_REQUEST);
    }

    // Content size validation
    const contentStr = typeof value.content === 'string' ? value.content : JSON.stringify(value.content);
    if (contentStr.length > this.MAX_CONTENT_SIZE) {
      throw new HttpException('Content too long, please provide a file instead', HttpStatus.PAYLOAD_TOO_LARGE);
    }

    const request = new TransformationRequest(
      value.uuid,
      value.service,
      value.transport,
      value.from,
      value.to,
      value.content,
    );

    const strategy = this.transportFactory.getStrategy(request.transport);
    const result = await strategy.handle(request);

    this.logger.logTransformation(request.from, request.to, result.success, result.error);

    if (!result.success) {
      throw new HttpException(result.error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return result.data.getContent();
  }
}
