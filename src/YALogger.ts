import Performance from './Performance';

class LogLevelDefault {
  static get header() {
    return '';
  }

  static get logFunc() {
    return console.log;
  }
}

class LogLevelInfo {
  static get header() {
    return '[INFO]';
  }

  static get logFunc() {
    return console.info;
  }
}

class LogLevelWarn {
  static get header() {
    return '[WARN]';
  }

  static get logFunc() {
    return console.warn;
  }
}

class LogLevelError {
  static get header() {
    return '[ERROR]';
  }

  static get logFunc() {
    return console.error;
  }
}

export interface ILoggerOption {
  isDebug: boolean;
  applicationName: string;
}

export default class YALogger {
  private isDebug: boolean;
  private applicationName: string;

  constructor(opt: ILoggerOption) {
    this.isDebug = opt.isDebug || false;
    this.applicationName = opt.applicationName || 'yalogger';
  }

  public set setDebugMode(isDebug: boolean) {
    this.isDebug = isDebug;
  }

  public log(message: string) {
    this.callLogFunc(LogLevelDefault, message);
  }

  public info(message: string) {
    this.callLogFunc(LogLevelInfo, message);
  }

  public warn(message: string) {
    this.callLogFunc(LogLevelWarn, message);
  }

  public error(message: string) {
    this.callLogFunc(LogLevelError, message);
  }

  private callLogFunc(level, message) {
    if (!this.isDebug) {
      return;
    }
    if (window.console) {
      level.logFunc(
        ...this.headers(level, Performance.elapsedTime),
        message,
      );
    }
  }

  private headers(level, time) {
    const modifiedTime = Math.round(time * 10) / 10; // truncate beyond the 2nd decimal point
    return [
      `%c${this.applicationName}`,
      'display: inline-block; color: #fff; background: #669900; padding: 1px 4px; border-radius: 3px;',
      `${level.header}(${modifiedTime}ms)`,
    ];
  }
}
