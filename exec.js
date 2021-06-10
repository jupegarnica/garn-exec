function splitCommand(command) {
  const myRegexp = /[^\s"]+|"([^"]*)"/gi;
  const splits = [];
  let match;
  do {
    match = myRegexp.exec(command);
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

export const cd = (path) => (exec.cwd = path);

export const $ = () => './';
