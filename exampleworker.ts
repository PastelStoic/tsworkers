import { setupWorker } from "./workerfile.ts";

export const createExampleWorker = setupWorker(import.meta.url, self, exampleFunction);

let counter = 0;

function exampleFunction(input: string) {
  counter += 1;
  return input.toUpperCase() + counter;
}
