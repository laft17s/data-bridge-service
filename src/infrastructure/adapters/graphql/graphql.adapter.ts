import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TransformationResponse } from './transformation.types';
import { GraphQLJSON } from 'graphql-type-json';
import { AppLogger } from '../../logging/app-logger.service';
import { TransportFactory } from '../transport/transport.factory';
import { TransformationRequest } from '../../../domain/entities/transformation-request.entity';
import { DataFormat } from '../../../domain/constants/data-format.enum';
import { TransportType } from '../../../domain/constants/transport-type.enum';

@Resolver()
export class GraphQLAdapter {
  constructor(
    private readonly transportFactory: TransportFactory,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(GraphQLAdapter.name);
  }

  @Query(() => String)
  healthCheck(): string {
    return 'Data Bridge Service is up and running';
  }

  @Mutation(() => TransformationResponse)
  async transform(
    @Args('uuid') uuid: string,
    @Args('service') service: string,
    @Args('transport', { type: () => TransportType }) transport: TransportType,
    @Args('from', { type: () => DataFormat }) from: DataFormat,
    @Args('to', { type: () => DataFormat }) to: DataFormat,
    @Args('content', { type: () => GraphQLJSON }) content: any,
  ): Promise<TransformationResponse> {
    const request = new TransformationRequest(uuid, service, transport, from, to, content);
    
    const strategy = this.transportFactory.getStrategy(transport);
    const result = await strategy.handle(request);

    this.logger.logTransformation(from, to, result.success, result.error);

    return {
      success: result.success,
      data: result.data?.getContent(),
      error: result.error,
    };
  }
}
