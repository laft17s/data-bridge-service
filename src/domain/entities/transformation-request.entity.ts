import { DataFormat } from '../constants/data-format.enum';
import { TransportType } from '../constants/transport-type.enum';

export class TransformationRequest {
  constructor(
    public readonly uuid: string,
    public readonly service: string,
    public readonly transport: TransportType,
    public readonly from: DataFormat,
    public readonly to: DataFormat,
    public readonly content: any,
  ) {}
}
