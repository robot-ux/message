# Message

## Usage

```js
import { injectEvent, emitEvent } from '@binance-chain/message';

//
injectEvent('requestAccounts', (data) => {
  return {};
});

emitEvent('requestAccounts');
```
