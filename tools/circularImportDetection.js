const CircularDependencyPlugin = require('circular-dependency-plugin');
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from "./chalkConfig";

const MAX_CYCLES = 5;
let numCyclesDetected = 0;

const plugin = new CircularDependencyPlugin({
  exclude: /a\.js|node_modules/,
  cwd: process.cwd(),

  onStart({ compilation }) {
    console.log(chalkWarning("Checking for circular dependencies"));
    console.log(chalkWarning("-----------------------------------------------"));

    numCyclesDetected = 0;
  },
  onDetected({ module: webpackModuleRecord, paths, compilation }) {
    numCyclesDetected++;
    compilation.warnings.push(new Error(paths.join(' -> ')))
  },
  onEnd({ compilation }) {
    if (numCyclesDetected > MAX_CYCLES) {
      compilation.errors.push(new Error(
        `Detected ${numCyclesDetected} cycles which exceeds configured limit of ${MAX_CYCLES}`
      ));
    }

    console.log(chalkSuccess("Check for circular dependencies has ended."));
    console.log(chalkSuccess("-----------------------------------------------"));
  },
})

module.exports = plugin;
