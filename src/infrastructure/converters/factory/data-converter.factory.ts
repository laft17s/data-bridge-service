import { Injectable, Inject } from '@nestjs/common';
import { IDataConverterFactory } from '../../../application/ports/data-converter-factory.interface';
import { IDataConverter } from '../../../domain/interfaces/data-converter.interface';
import { DataFormat } from '../../../domain/constants/data-format.enum';

@Injectable()
export class DataConverterFactory implements IDataConverterFactory {
  constructor(
    @Inject('STRATEGIES')
    private readonly strategies: IDataConverter[],
  ) {}

  getConverter(from: DataFormat, to: DataFormat): IDataConverter {
    const converter = this.strategies.find((s) => s.supports(from, to));
    if (!converter) {
      throw new Error(`No converter found for transformation: ${from} to ${to}`);
    }
    return converter;
  }
}
