Problems:

"self" is per-worker, and only code in the global area triggers a new one. The
only way to have different input trigger for different

I confirmed that different workers have their

Option 1: split createworker into two functions: a "register" function that
assigns code to self and a "createworker" function that makes the worker. For
type safety, I'll have a single "setupworker" object that takes the code to run,
sets up the onmessage, and exports a createworker function.

typeof Window === 'undefined' returns true if we're inside a worker, so I can
skip the worker creation code if this is true.
