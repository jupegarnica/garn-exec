# Garn Exec

A deno utility to run subprocess easily.

## $ usage

```js
import { $ } from '../exec.js';

await $`cp *.js ..`;
```

```js
import { $ } from '../exec.js';

const { stdout, code } = await $`echo hola mundo`;

console.log(stdout); // hola mundo\n
console.log(code); // 0
```

```js
import { $ } from '../exec.js';

try {
  await $`sh test/fail.sh`;
} catch (error) {
  console.log(error.code); // 4
}
```

## cd usage

```js
import { $, cd } from '../exec.js';
cd('test');
await $`ls`;
```

## bash usage

```js
import { bash } from '../exec.js';
await bash`cd test && ls | grep fail`;
```
