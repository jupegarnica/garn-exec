# Garn Exec

A deno utility to run subprocess easily.

## $ usage

```js
import { $ } from 'https://deno.land/x/garn_exec@0.2.0';

await $`cp *.js ..`;
```

```js
import { $ } from 'https://deno.land/x/garn_exec@0.2.0';

const { stdout, code } = await $`echo hola mundo`;

console.log(stdout); // hola mundo\n
console.log(code); // 0
```

```js
import { $ } from 'https://deno.land/x/garn_exec@0.2.0';

try {
  await $`sh test/fail.sh`;
} catch (error) {
  console.log(error.code); // 4
}
```

## cd usage

```js
import { $, cd } from 'https://deno.land/x/garn_exec@0.2.0';
cd('test');
await $`ls`;
```

## bash usage

```js
import { bash } from 'https://deno.land/x/garn_exec@0.2.0';
await bash`cd test && ls | grep fail`;
```
