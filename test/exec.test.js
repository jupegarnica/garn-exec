import { exec } from "../exec.js";
import {
  assertEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.98.0/testing/asserts.ts";

Deno.test({
  // ignore: false,
  name: "must resolve",
  fn: async () => {
    const { code, success, stdout, stderr } = await exec(
      "echo hola",
    );
    assertEquals(code, 0);
    assertEquals(success, true);
    assertEquals(stderr, "");
    assertStringIncludes(stdout, "hola");
  },
});

Deno.test({
  // ignore: false,
  name: "must split right",
  fn: async () => {
    const { code, success, stdout, stderr } = await exec(
      'echo "hola mundo"',
    );
    assertEquals(code, 0);
    assertEquals(success, true);
    assertEquals(stderr, "");
    assertEquals(stdout, "hola mundo\n");
  },
});

Deno.test({
  //   only: true,
  name: "must fail if the process fails",
  fn: async () => {
    try {
      await exec("deno run test/fail.js");
      throw "fails";
    } catch (error) {
      const { code, success, stdout, stderr } = error;
      assertEquals(code, 1);
      assertEquals(success, false);
      assertStringIncludes(stderr, "this fails");
      assertEquals(stdout, "");
    }
  },
});

Deno.test({
  name: "must fail with code -1 if the process can not be launch",
  fn: async () => {
    try {
      await exec("asdqwewerññ");
      throw "fails";
    } catch (error) {
      const { code, success, stdout, stderr } = error;
      assertStringIncludes(stderr, "os error 2");
      assertEquals(code, -1);
      assertEquals(success, false);
      assertEquals(stdout, undefined);
    }
  },
});

Deno.test({
  // only: true,
  name: "must work with sh scripts",
  fn: async () => {
    const { code, success, stdout, stderr } = await exec(
      "sh test/success.sh",
    );
    assertEquals(code, 0);
    assertEquals(success, true);
    assertEquals(stderr, "");
    assertStringIncludes(stdout, "fail.sh\n");
    assertStringIncludes(stdout, "fail.js\n");
  },
});
Deno.test({
  // only: true,
  name: "must fail if exit code is not 0",
  fn: async () => {
    try {
      await exec("sh test/fail.sh");
      throw "fails";
    } catch (error) {
      const { code, success, stdout } = error;
      assertEquals(code, 4);
      assertEquals(success, false);
      assertStringIncludes(stdout, "hola mundo\n");
    }
  },
});

// Deno.test({
//   // only: true,
//   name: 'must fail if exit code is not 0',
//   fn: async () => {
//     try {
//       await exec('tail -f test/fail.sh');
//       throw 'fails';
//     } catch (error) {
//       const { code, success, stdout } = error;
//       assertEquals(code, 4);
//       assertEquals(success, false);
//       assertStringIncludes(stdout, 'hola mundo\n');
//     }
//   },
// });
