# Message

## Install

```sh
yarn add @actool/message -S
```

## Usage

```js
import { BaseMessage, ExtensionMessage } from '@actool/message';

// event
const event = new BaseMessage();
event.connect();

event.on('requestAccounts', async (params) => {
  return Promise.resolve({ address: '0x1234', id: (params as any).id });
});

event
  .emit('requestAccounts', { id: 123 })
  .then((res) => {
    console.log(res);
  })
  .catch((e) => console.log('error: ', e));
```
