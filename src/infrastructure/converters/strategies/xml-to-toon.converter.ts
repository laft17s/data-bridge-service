import { Injectable } from '@nestjs/common';
import { IDataConverter } from '../../../domain/interfaces/data-converter.interface';
import { DataContent } from '../../../domain/entities/data-content.entity';
import { DataFormat } from '../../../domain/constants/data-format.enum';
import { encode } from '@toon-format/toon';
import * as xml2js from 'xml2js';

@Injectable()
export class XmlToToonConverter implements IDataConverter {
  supports(from: DataFormat, to: DataFormat): boolean {
    return from === DataFormat.XML && to === DataFormat.TOON;
  }

  async convert(data: DataContent, targetFormat: DataFormat): Promise<DataContent> {
    if (!this.supports(data.getFormat(), targetFormat)) {
      throw new Error(`Unsupported transformation: ${data.getFormat()} to ${targetFormat}`);
    }

    const parser = new xml2js.Parser({ explicitArray: false });
    const json = await parser.parseStringPromise(data.getContent());
    const toon = encode(json);
    
    return new DataContent(toon, DataFormat.TOON);
  }
}
