import { resolve } from 'https://deno.land/std@0.98.0/path/mod.ts';
import { existsSync } from 'https://deno.land/std@0.98.0/fs/mod.ts';

export function splitCommand(command) {
  const regexp = /[^\s"]+|"([^"]*)"/gi;
  const splits = [];
  let match;
  do {
    match = regexp.exec(command);
    if (match != null) {
      splits.push(match[1] ? match[1] : match[0]);
    }
  } while (match != null);

  return splits;
}

export const exec = async (command) => {
  const splits = splitCommand(command);
  let p;
  let status;
  let stdout;
  let stderr;
  try {
    p = Deno.run({
      cmd: splits,
      stdout: 'piped',
      stderr: 'piped',
      cwd: exec.cwd,
    });

    const decoder = new TextDecoder();
    status = await p.status();
    stdout = decoder.decode(await p.output());
    stderr = decoder.decode(await p.stderrOutput());
    p.close();
    const result = {
      code: status.code,
      pid: p.pid,
      success: status.success,
      stdout,
      stderr,
    };
    if (!status.success) throw result;
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw {
        code: -1,
        success: false,
        stderr: error.message,
        error,
      };
    }
    throw error;
  }
};
exec.cwd = './';
export const cd = (path) => {
  const cwd = resolve(exec.cwd, path);
  if (!existsSync(cwd)) {
    throw new Error('Folder not found: ' + cwd);
  }
  exec.cwd = cwd;
};

function concat(strings, ...interpolations) {
  let command = strings[0];
  for (let index = 0; index < interpolations.length; index++) {
    command += interpolations[index] + strings[index + 1];
  }
  return command;
}

export const $ = (strings, ...interpolations) => {
  const command = concat(strings, ...interpolations);
  return exec(command);
};

export const bash = (strings, ...interpolations) => {
  const command = concat(strings, ...interpolations);
  return exec(`sh -c "${command}"`);
};
