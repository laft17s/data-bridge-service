import { DataFormat } from '../constants/data-format.enum';

export class DataContent {
  constructor(
    private readonly content: any,
    private readonly format: DataFormat,
  ) {}

  getContent(): any {
    return this.content;
  }

  getFormat(): DataFormat {
    return this.format;
  }

  // Tell Don't Ask: We could add methods here if there's logic to be encapsulated
  // For now, it's a simple value object/entity.
}
