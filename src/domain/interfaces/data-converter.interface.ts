import { DataContent } from '../entities/data-content.entity';
import { DataFormat } from '../constants/data-format.enum';

export interface IDataConverter {
  supports(from: DataFormat, to: DataFormat): boolean;
  convert(data: DataContent, targetFormat: DataFormat): Promise<DataContent>;
}
