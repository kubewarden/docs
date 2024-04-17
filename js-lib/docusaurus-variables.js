function dsVariableProcessor(fc) {

  /* A more general scheme for variable processing. Get the variables from
   * variables.json. Iterate over them, create a regex for each, use it to
   * replace all instances in the file content, fc, returning fc when complete.
   */

  const Variables = require("../variables.json");
  const keys = Object.keys(Variables);
  keys.forEach((key) => {
    const re = new RegExp("\\[\\[< " + key + " >\\]\\]", "g");
    fc = fc.replace(re, Variables[key]);
  });
  return fc;
}

module.exports = dsVariableProcessor;
