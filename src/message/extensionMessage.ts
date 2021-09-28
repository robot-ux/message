import { BaseMessage } from './baseMessage';
import browser from 'webextension-polyfill';

export class ExtensionMessage extends BaseMessage {
  port: browser.Runtime.Port;

  constructor() {
    super();

    this.port = null as any;
  }

  connect(name?: string) {
    if (this.port) return this.port;

    this.port = browser.runtime.connect({ name: name || 'extension-message' });
    return this.port;
  }

  _addListener(type: string, callback: (msg: any) => void) {
    this.port.onMessage.addListener(callback);
  }

  _send(params: any) {
    this.port.postMessage(params);
  }

  disconnect() {
    this.port.disconnect();
  }
}
