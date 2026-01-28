import { IDataConverter } from '../../domain/interfaces/data-converter.interface';
import { DataFormat } from '../../domain/constants/data-format.enum';

export interface IDataConverterFactory {
  getConverter(from: DataFormat, to: DataFormat): IDataConverter;
}
