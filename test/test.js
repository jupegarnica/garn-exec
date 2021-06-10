import { exec, cd } from '../exec.js';
import {
  assertEquals,
  assertStringIncludes,
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
      await exec('deno run fail.js');
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
  only: true,
  name: 'must fail exit code is not 0',
  fn: async () => {
    try {
      await exec('exit 1');
      throw 'fails';
    } catch (error) {
      console.log({ error });
      const { code, success, stdout, stderr } = error;
      assertEquals(code, 1);
      assertEquals(success, false);
      assertStringIncludes(stderr, 'this fails');
      assertEquals(stdout, '');
    }
  },
});
Deno.test({
  name: 'must fail if the process can not be launch',
  fn: async () => {
    try {
      await exec('asdqwewerññ');
      throw 'fails';
    } catch (error) {
      const { code, success, stdout, stderr } = error;
      assertStringIncludes(stderr, 'os error 2');
      assertEquals(code, undefined);
      assertEquals(success, false);
      assertEquals(stdout, undefined);
    }
  },
});
Deno.test({
  // only: true,
  name: 'must work with &&',
  fn: async () => {
    const { code, success, stdout, stderr } = await exec(
      'echo hola && echo mundo',
    );
    assertEquals(code, 0);
    assertEquals(success, true);
    assertEquals(stderr, '');
    assertEquals(stdout, 'hola');
  },
});

Deno.test({
  // only: true,
  name: 'must work with cd',
  fn: async () => {
    await cd('/home');
    const { code, success, stdout, stderr } = await exec('pwd');
    assertEquals(code, 0);
    assertEquals(success, true);
    assertEquals(stderr, '');
    assertEquals(stdout, '/home\n');
  },
});
