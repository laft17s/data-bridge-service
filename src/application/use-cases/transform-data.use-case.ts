import { Inject, Injectable } from '@nestjs/common';
import { DataContent } from '../../domain/entities/data-content.entity';
import { DataFormat } from '../../domain/constants/data-format.enum';
import { TransformationResult } from '../../domain/entities/transformation-result.entity';
import { IDataConverterFactory } from '../ports/data-converter-factory.interface';

@Injectable()
export class TransformDataUseCase {
  constructor(
    @Inject('IDataConverterFactory')
    private readonly converterFactory: IDataConverterFactory,
  ) {}

  async execute(
    content: any,
    fromFormat: DataFormat,
    toFormat: DataFormat,
  ): Promise<TransformationResult> {
    try {
      const sourceData = new DataContent(content, fromFormat);
      const converter = this.converterFactory.getConverter(fromFormat, toFormat);
      
      const transformedData = await converter.convert(sourceData, toFormat);
      
      return new TransformationResult(true, transformedData);
    } catch (error) {
      return new TransformationResult(false, undefined, error.message);
    }
  }
}
