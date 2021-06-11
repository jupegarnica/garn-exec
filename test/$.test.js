import { exec, cd, $ } from '../exec.js';
import {
  assertEquals,
  assertStringIncludes,
  assertThrows,
} from 'https://deno.land/std@0.98.0/testing/asserts.ts';

Deno.test({
  // only: true,
  name: 'must work with $ tagged string',
  fn: async () => {
    const { code, success, stdout, stderr } = await $`l${'s'} .`;
    assertEquals(code, 0);
    assertEquals(success, true);
    assertEquals(stderr, '');
    assertStringIncludes(stdout, 'test\n');
    assertStringIncludes(stdout, 'exec.js\n');
  },
});

Deno.test({
  // only: true,
  name: '$ must work with cd',
  fn: async () => {
    cd('./test');
    const r1 = await $`pwd`;

    assertStringIncludes(r1.stdout, '/test\n');

    cd('..');
    const r2 = await $`pwd`;
    assertStringIncludes(r2.stdout, Deno.cwd());
    assertStringIncludes(exec.cwd, Deno.cwd());
    assertThrows(() => cd('./notFoundFolder'));
  },
});
