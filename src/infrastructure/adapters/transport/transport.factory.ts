import { Injectable, Inject } from '@nestjs/common';
import { ITransportStrategy } from '../../../application/ports/transport-strategy.interface';
import { TransportType } from '../../../domain/constants/transport-type.enum';

@Injectable()
export class TransportFactory {
  constructor(
    @Inject('TRANSPORT_STRATEGIES')
    private readonly strategies: ITransportStrategy[],
  ) {}

  getStrategy(transport: TransportType): ITransportStrategy {
    const strategy = this.strategies.find((s) => s.supports(transport));
    if (!strategy) {
      throw new Error(`No transport strategy found for: ${transport}`);
    }
    return strategy;
  }
}
