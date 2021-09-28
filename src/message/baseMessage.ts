import { EventEmitter } from 'events';
import { ethErrors, serializeError } from 'eth-rpc-errors';

export class BaseMessage {
  port: EventEmitter | any;

  constructor() {
    this.port = null as any;
  }

  _getCallbackType(type: string) {
    return `${type}_callback`;
  }

  _addListener(type: string, callback: (msg: any) => void) {
    this.port.on(type, (msg: any) => callback({ type, params: msg }));
  }

  _send(params: any) {
    this.port.emit(params.type, params.params);
  }

  connect() {
    if (this.port) return this.port;

    this.port = new EventEmitter();
    return this.port;
  }

  on(type: string, callback: (params?: object) => Promise<object>) {
    this._addListener(type, async (msg) => {
      if (msg.type !== type) return;
      const cbType = this._getCallbackType(type);

      try {
        const data = await callback(msg.params);
        this._send({ type: cbType, params: data });
      } catch (e) {
        const err = (e as any).code
          ? e
          : ethErrors.provider.custom({
              code: (e as any).code || 1000,
              message: (e as any).message,
              data: (e as any).data || undefined,
            });

        this._send({ type: cbType, params: serializeError(err) });
      }
    });
  }

  emit(type: string, params?: object): Promise<object> {
    return new Promise((resolve, reject) => {
      const cbType = this._getCallbackType(type);

      this._addListener(cbType, async (msg) => {
        if (msg.type === cbType) {
          if (!msg.params.code) {
            resolve(msg.params);
            return;
          }
          reject(msg.params);
        }
      });

      this._send({ type, params });
    });
  }

  disconnect() {
    this.port.removeAllListeners();
  }
}
