Workerfile is a streamlined way to set up workers for multithreaded programs.
Setting up a worker takes a single line of code, as shown below:

```ts
export const createExampleWorker = createWorker(
  import.meta.url,
  self,
  myFunction,
);
```

From there, any part of the code can create a simplified worker:

```ts
const worker = createExampleWorker();
const output = await worker.run();
```

Both input and output of the given function can be anything serializable, and
will return as smoothly as if the code was running on the main thread.
