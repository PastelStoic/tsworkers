function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Creates a simplified interface for workers. DO NOT create more than one per file.
 * To use, create a file, then add the line
 * ```ts
 * export const createExampleWorker = createWorker(import.meta.url, self, myFunction);
 * ```
 * @param importurl Must always be `import.meta.url`
 * @param workerself Must always be `self`
 * @param code The code to be run. Promises work too.
 * @param checkDelay How long to wait between each result check.
 * The default is usually fine, but for very fast code you may want to lower it.
 * @returns
 */
export function setupWorker<TIn = void, TOut = void>(
  importurl: string,
  workerself: unknown,
  code: (input: TIn) => TOut,
  checkDelay = 10,
) {
  function create() {
    const worker = new Worker(
      new URL(importurl).href,
      {
        type: "module",
      },
    );

    let busy = false;
    let result: TOut | null = null;

    worker.onmessage = (msg) => {
      busy = false;
      result = msg.data as TOut;
    };

    async function run(input: TIn) {
      worker.postMessage(input);
      busy = true;
      while (busy) {
        await sleep(checkDelay);
      }
      return result;
    }

    return {
      run,
      isBusy: () => busy,
      terminate: () => worker.terminate(),
    };
  }

  // @ts-ignore web worker
  workerself.onmessage = async (evt) => {
    const result = code(evt.data);

    if (result instanceof Promise) {
      // @ts-ignore web worker
      workerself.postMessage(await result);
    } else {
      // @ts-ignore web worker
      workerself.postMessage(result);
    }
  };

  return create;
}
