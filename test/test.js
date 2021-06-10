import { exec, cd, $ } from '../exec.js';
import {
  assertEquals,
  assertStringIncludes,
  assertThrows,
} from 'https://deno.land/std@0.98.0/testing/asserts.ts';

Deno.test({
  // ignore: false,
  name: 'must resolve',
  fn: async () => {
    const { code, success, stdout, stderr } = await exec(
      'echo hola',
    );
    assertEquals(code, 0);
    assertEquals(success, true);
    assertEquals(stderr, '');
    assertStringIncludes(stdout, 'hola');
  },
});

Deno.test({
  //   only: true,
  name: 'must fail if the process fails',
  fn: async () => {
    try {
      await exec('deno run test/fail.js');
      throw 'fails';
    } catch (error) {
      const { code, success, stdout, stderr } = error;
      assertEquals(code, 1);
      assertEquals(success, false);
      assertStringIncludes(stderr, 'this fails');
      assertEquals(stdout, '');
    }
  },
});

Deno.test({
  name: 'must fail with code -1 if the process can not be launch',
  fn: async () => {
    try {
      await exec('asdqwewerññ');
      throw 'fails';
    } catch (error) {
      const { code, success, stdout, stderr } = error;
      assertStringIncludes(stderr, 'os error 2');
      assertEquals(code, -1);
      assertEquals(success, false);
      assertEquals(stdout, undefined);
    }
  },
});

Deno.test({
  // only: true,
  name: 'must work with sh scripts',
  fn: async () => {
    const { code, success, stdout, stderr } = await exec(
      'sh test/success.sh',
    );
    assertEquals(code, 0);
    assertEquals(success, true);
    assertEquals(stderr, '');
    assertStringIncludes(stdout, 'fail.sh');
    assertStringIncludes(stdout, 'fail.js');
  },
});
Deno.test({
  // only: true,
  name: 'must fail if exit code is not 0',
  fn: async () => {
    try {
      await exec('sh test/fail.sh');
      throw 'fails';
    } catch (error) {
      const { code, success, stdout } = error;
      assertEquals(code, 4);
      assertEquals(success, false);
      assertStringIncludes(stdout, 'hola mundo\n');
    }
  },
});

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
  name: 'must work with cd',
  fn: async () => {
    cd('./test');
    const r1 = await exec('pwd');

    assertStringIncludes(r1.stdout, '/test\n');

    cd('..');
    const r2 = await exec('pwd');
    assertStringIncludes(r2.stdout, '/garn-exec\n');
    assertThrows(() => cd('./notFoundFolder'));
  },
});
