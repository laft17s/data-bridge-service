import { Injectable } from '@nestjs/common';
import { IDataConverter } from '../../../domain/interfaces/data-converter.interface';
import { DataContent } from '../../../domain/entities/data-content.entity';
import { DataFormat } from '../../../domain/constants/data-format.enum';
import { decode } from '@toon-format/toon';
import * as xml2js from 'xml2js';

@Injectable()
export class ToonToXmlConverter implements IDataConverter {
  supports(from: DataFormat, to: DataFormat): boolean {
    return from === DataFormat.TOON && to === DataFormat.XML;
  }

  async convert(data: DataContent, targetFormat: DataFormat): Promise<DataContent> {
    if (!this.supports(data.getFormat(), targetFormat)) {
      throw new Error(`Unsupported transformation: ${data.getFormat()} to ${targetFormat}`);
    }

    const json = decode(data.getContent());
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(json);
    
    return new DataContent(xml, DataFormat.XML);
  }
}
