import { BaseMessage, ExtensionMessage } from '../src';
import { ethErrors } from 'eth-rpc-errors';

describe('events', () => {
  it('emit event', () => {
    // background
    const server = new ExtensionMessage();
    server.connect();
    server.on('requestAccounts', (params) => {
      // throw ethErrors.rpc.methodNotFound({
      //   data: {
      //     id: '17188907',
      //     jsonrpc: '2.0',
      //     method: 'eth_requestAccountss',
      //     origin: 'https://github.com',
      //   },
      // });

      return Promise.resolve({ address: '0x1234', id: (params as any).id });
    });

    const event = new BaseMessage();
    event.connect();

    // content_script
    const port = new ExtensionMessage();
    port.connect();
    event.on('requestAccounts', async (params) => port.emit('requestAccounts', params));

    // inpage
    event
      .emit('requestAccounts', { id: 123 })
      .then((res) => {
        console.log({ requestData: { requestAccounts: { id: 123 } } });
        console.log(res);
      })
      .catch((e) => console.log('error: ', e));
  });
});
