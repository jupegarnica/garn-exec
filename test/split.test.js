import { splitCommand } from '../exec.js';
import { assertEquals } from 'https://deno.land/std@0.98.0/testing/asserts.ts';

Deno.test({
  // ignore: false,
  name: 'splitCommand',
  fn: () => {
    const splits = splitCommand('echo hola');
    assertEquals(splits, ['echo', 'hola']);
  },
});

Deno.test({
  // ignore: false,
  name: 'splitCommand',
  fn: () => {
    const splits = splitCommand(`
    echo hola;
    echo adios;
    `);
    assertEquals(splits, ['echo', 'hola;', 'echo', 'adios;']);
  },
});
