# Garn Exec

A deno utility to run subprocess easily.

## Usage

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
  await $`sh tests/fail.sh`;
} catch (error) {
  console.log(error.code); // 1
}
```
