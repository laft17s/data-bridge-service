import { Injectable } from '@nestjs/common';
import { IDataConverter } from '../../../domain/interfaces/data-converter.interface';
import { DataContent } from '../../../domain/entities/data-content.entity';
import { DataFormat } from '../../../domain/constants/data-format.enum';
import * as xml2js from 'xml2js';

@Injectable()
export class JsonToXmlConverter implements IDataConverter {
  private builder = new xml2js.Builder();

  supports(from: DataFormat, to: DataFormat): boolean {
    return from === DataFormat.JSON && to === DataFormat.XML;
  }

  async convert(data: DataContent, targetFormat: DataFormat): Promise<DataContent> {
    if (!this.supports(data.getFormat(), targetFormat)) {
      throw new Error(`Unsupported transformation: ${data.getFormat()} to ${targetFormat}`);
    }

    const xml = this.builder.buildObject(data.getContent());
    return new DataContent(xml, DataFormat.XML);
  }
}
