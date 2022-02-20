# Garn Exec

A deno utility to run subprocess easily.

## $ usage

Must be run --allow-run permission.

```js
import { $ } from "https://deno.land/x/garn_exec/exec.js";

await $`cp *.js ..`;
```

```js
import { $ } from "https://deno.land/x/garn_exec/exec.js";

const { stdout, code } = await $`echo hola mundo`;

console.log(stdout); // hola mundo\n
console.log(code); // 0
```

```js
import { $ } from "https://deno.land/x/garn_exec/exec.js";

try {
  await $`sh test/fail.sh`;
} catch (error) {
  console.log(error.code); // 4
}
```

## cd usage

```js
import { $, cd } from "https://deno.land/x/garn_exec/exec.js";
cd("test");
await $`ls`;
```

## sh usage

```js
import { sh } from "https://deno.land/x/garn_exec/exec.js";
await sh`cd test && ls | grep fail`;
```
