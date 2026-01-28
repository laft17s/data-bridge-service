import { DataContent } from './data-content.entity';

export class TransformationResult {
  constructor(
    public readonly success: boolean,
    public readonly data?: DataContent,
    public readonly error?: string,
    public readonly metadata?: Record<string, any>,
  ) {}
}
