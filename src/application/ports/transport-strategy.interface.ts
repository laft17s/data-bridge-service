import { TransformationRequest } from '../../domain/entities/transformation-request.entity';
import { TransformationResult } from '../../domain/entities/transformation-result.entity';
import { TransportType } from '../../domain/constants/transport-type.enum';

export interface ITransportStrategy {
  supports(transport: TransportType): boolean;
  handle(request: TransformationRequest): Promise<TransformationResult>;
}
