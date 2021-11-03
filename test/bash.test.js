import { bash } from "../exec.js";
import { assertEquals } from "https://deno.land/std@0.98.0/testing/asserts.ts";

Deno.test({
  // only: true,
  name: "must work with piping",
  fn: async () => {
    const { code, success, stdout, stderr } = await bash`ls | grep test`;
    assertEquals(code, 0);
    assertEquals(success, true);
    assertEquals(stderr, "");
    assertEquals(stdout, "test\n");
  },
});

Deno.test({
  // only: true,
  name: "must work with &&",
  fn: async () => {
    const { code, success, stdout, stderr } = await bash
      `cd test && ls | grep fail`;
    assertEquals(code, 0);
    assertEquals(success, true);
    assertEquals(stderr, "");
    assertEquals(stdout, "fail.js\nfail.sh\n");
  },
});

Deno.test({
  // only: true,
  name: "must work as script",
  fn: async () => {
    try {
      await bash`
    cd test;
    ls | grep fail;
    echo hola;
    exit 33`;
      throw "fails";
    } catch (error) {
      const { code, success, stdout, stderr } = error;
      assertEquals(code, 33);
      assertEquals(success, false);
      assertEquals(stderr, "");
      assertEquals(stdout, "fail.js\nfail.sh\nhola\n");
    }
  },
});
