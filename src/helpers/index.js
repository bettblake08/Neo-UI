import PropTypes from 'prop-types';
import Regex from "./regex";
import Common from "./common"

export {
  Regex,
  Common
}

export const STATUS_STRINGS = [
  "normal",
  "fail",
  "success",
  "loading",
  "warning",
  "fail:fixed",
  "success:fixed",
];

export const COMPONENT_STATUS_CLASS = [
  "normal",
  "fail",
  "success",
  "loading",
  "warning",
  "fail",
  "success",
];

export const defaultReactiveUIProps = {
  defaultStatus: PropTypes.number,
  componentStateKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  parent: PropTypes.instanceOf(Object).isRequired
};

export const defaultReactiveUIDefaultProps = {
  defaultStatus: 0,
  componentStateKey: "neoComponents"
};

export default {
  STATUS_STRINGS,
  Regex,
  Common
};
