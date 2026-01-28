import { Injectable } from '@nestjs/common';
import { IDataConverter } from '../../../domain/interfaces/data-converter.interface';
import { DataContent } from '../../../domain/entities/data-content.entity';
import { DataFormat } from '../../../domain/constants/data-format.enum';
import { stringify } from 'csv-stringify/sync';

@Injectable()
export class JsonToCsvConverter implements IDataConverter {
  supports(from: DataFormat, to: DataFormat): boolean {
    return from === DataFormat.JSON && to === DataFormat.CSV;
  }

  async convert(data: DataContent, targetFormat: DataFormat): Promise<DataContent> {
    if (!this.supports(data.getFormat(), targetFormat)) {
      throw new Error(`Unsupported transformation: ${data.getFormat()} to ${targetFormat}`);
    }

    const content = data.getContent();
    const csv = stringify(Array.isArray(content) ? content : [content], { header: true });
    return new DataContent(csv, DataFormat.CSV);
  }
}
