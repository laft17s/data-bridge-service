import { Injectable } from '@nestjs/common';
import { IDataConverter } from '../../../domain/interfaces/data-converter.interface';
import { DataContent } from '../../../domain/entities/data-content.entity';
import { DataFormat } from '../../../domain/constants/data-format.enum';
import * as xml2js from 'xml2js';

@Injectable()
export class XmlToJsonConverter implements IDataConverter {
  supports(from: DataFormat, to: DataFormat): boolean {
    return from === DataFormat.XML && to === DataFormat.JSON;
  }

  async convert(data: DataContent, targetFormat: DataFormat): Promise<DataContent> {
    if (!this.supports(data.getFormat(), targetFormat)) {
      throw new Error(`Unsupported transformation: ${data.getFormat()} to ${targetFormat}`);
    }

    const parser = new xml2js.Parser({ explicitArray: false });
    const json = await parser.parseStringPromise(data.getContent());
    return new DataContent(json, DataFormat.JSON);
  }
}
