import { exec, cd } from '../exec.js';
import {
  assertStringIncludes,
  assertThrows,
} from 'https://deno.land/std@0.98.0/testing/asserts.ts';

Deno.test({
  // only: true,
  name: 'must work with cd',
  fn: async () => {
    cd('./test');
    const r1 = await exec('pwd');

    assertStringIncludes(r1.stdout, '/test\n');

    cd('..');
    const r2 = await exec('pwd');
    assertStringIncludes(r2.stdout, Deno.cwd());
    assertStringIncludes(exec.cwd, Deno.cwd());
    assertThrows(() => cd('./notFoundFolder'));
  },
});
