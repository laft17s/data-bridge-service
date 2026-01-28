import { Injectable } from '@nestjs/common';
import { ITransportStrategy } from '../../../application/ports/transport-strategy.interface';
import { TransformationRequest } from '../../../domain/entities/transformation-request.entity';
import { TransformationResult } from '../../../domain/entities/transformation-result.entity';
import { TransportType } from '../../../domain/constants/transport-type.enum';
import { TransformDataUseCase } from '../../../application/use-cases/transform-data.use-case';

@Injectable()
export class RestTransportStrategy implements ITransportStrategy {
  constructor(private readonly transformDataUseCase: TransformDataUseCase) {}

  supports(transport: TransportType): boolean {
    return transport === TransportType.REST;
  }

  async handle(request: TransformationRequest): Promise<TransformationResult> {
    return this.transformDataUseCase.execute(
      request.content,
      request.from,
      request.to,
    );
  }
}
