import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends Logger {
  private customContext: string;

  setContext(context: string) {
    this.customContext = context;
  }

  logTransformation(from: string, to: string, success: boolean, error?: string) {
    const status = success ? 'SUCCESS' : 'FAILED';
    const message = `Transformation ${from} -> ${to}: ${status}${error ? ` - Error: ${error}` : ''}`;
    
    if (success) {
      this.log(message, this.customContext);
    } else {
      this.error(message, undefined, this.customContext);
    }
  }
}
