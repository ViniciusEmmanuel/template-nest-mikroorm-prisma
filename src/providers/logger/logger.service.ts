/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import pino, { Logger, Level } from 'pino';

type ParamsError = {
  error: Error | Pick<typeof Object, 'prototype'> | unknown;
  message?: string;
  args?: any[];
};

@Injectable()
export class LoggerService {
  private provider: Logger;

  private readonly transport = pino.destination({
    dest: process.cwd() + '/logs',
    sync: false,
  });

  constructor() {
    this.provider = pino(this.transport);
  }

  private logger(
    level: Level,
    ...args: [obj: unknown, msg?: string, ...args: any[]]
  ): void;
  private logger(level: Level, ...args: [message: string, ...args: any[]]) {
    this.provider[level](...args);
  }

  log(message: string, ...optionalParams: any[]) {
    this.logger('info', null, message, optionalParams);
  }

  error(paramError: ParamsError) {
    const message = paramError?.message || 'Error';
    const args = Array.isArray(paramError?.args) ? paramError.args : [];

    this.logger('error', paramError.error, message, ...args);
  }
}
