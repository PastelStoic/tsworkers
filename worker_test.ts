import { createExampleWorker } from "./exampleworker.ts";

const exampleworker = createExampleWorker();
const exampleworker2 = createExampleWorker();
console.log(await exampleworker.run("string one"));
console.log(await exampleworker2.run("string two"));
console.log(await exampleworker.run("string one"));
console.log(await exampleworker2.run("string two"));

exampleworker.terminate();
exampleworker2.terminate();
