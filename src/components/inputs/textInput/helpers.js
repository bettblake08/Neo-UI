import { Regex } from "../../../helpers";

const getInputStatus = (inputValue, testInput) => {
  if (typeof testInput === "string") return Regex[testInput].test(inputValue);
  else if (testInput instanceof RegExp) return testInput.test(inputValue);
  else if (testInput instanceof Function) return testInput(inputValue);
}

export {
  getInputStatus
};
