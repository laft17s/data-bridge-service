import { Injectable } from '@nestjs/common';
import { IDataConverter } from '../../../domain/interfaces/data-converter.interface';
import { DataContent } from '../../../domain/entities/data-content.entity';
import { DataFormat } from '../../../domain/constants/data-format.enum';
import { parse } from 'csv-parse/sync';

@Injectable()
export class CsvToJsonConverter implements IDataConverter {
  supports(from: DataFormat, to: DataFormat): boolean {
    return from === DataFormat.CSV && to === DataFormat.JSON;
  }

  async convert(data: DataContent, targetFormat: DataFormat): Promise<DataContent> {
    if (!this.supports(data.getFormat(), targetFormat)) {
      throw new Error(`Unsupported transformation: ${data.getFormat()} to ${targetFormat}`);
    }

    const json = parse(data.getContent(), { columns: true, skip_empty_lines: true });
    return new DataContent(json, DataFormat.JSON);
  }
}
