# terrarium

Run `npm start` to
  1. watch TS files
  2. start server on `localhost:9000`

Entry point is currently `/dist/index.js` (compiled from `/src/index.ts`).

PROBLEM:
  - `index.html` is served correctly, and is loading `dist/index.js` without problem.
  - HOWEVER — line 5 of `dist/index.js` is causing this error:
  ```
  Uncaught ReferenceError: exports is not defined
  ```
  - According to this [Stackoverflow link](https://stackoverflow.com/questions/54670544/how-to-fix-referenceerror-exports-is-not-defined-in-a-pure-typescript-project) the error is caused by the fact that TypeScript compiles down to JavaScript modules, though most browsers don't support modules at this time. 
  - TO FIX — "You will need to use some tool (webpack, rollup, browserify) to bundle your modules after compilation". Boooo. But OK. This is the next step: getting webpack to play nicely with TS.
