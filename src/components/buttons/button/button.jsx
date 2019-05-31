import React, { Component } from "react";
import PropTypes from 'prop-types';

import Helpers, {
  STATUS_STRINGS,
  COMPONENT_STATUS_CLASS,
  defaultReactiveUIProps,
  defaultReactiveUIDefaultProps
} from "../../../helpers";

class Button extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: props.defaultStatus
    };
  }

  componentDidMount(){
    Helpers.Common.attachToParentComponent(this);
  }
    
  componentDidUpdate(){
    Helpers.Common.resetInteractiveComponentStatus(this);
  }

	setStatus = status => {
	  const statusIndex = STATUS_STRINGS.findIndex(string => string === status);
	  this.setState({
	    status: statusIndex > 0 ? statusIndex : 0
	  });
	}

  renderIcon = icon => {
    if (typeof icon === 'string') return (<i className={`fas fa-${icon} icon`} />);
    return icon;
  }

  setIcon = config => (
    <>
      <div className={`${config.type}__icon`}>
        {this.renderIcon(config.icon)}
      </div>
      <div className={`${config.type}__label f_normal`}>{config.label}</div>
    </>
  )

  render() {
	  const { config: { type = 'neo-button', label, action, icon } } = this.props;
	  const { status } = this.state;
    const statusText = COMPONENT_STATUS_CLASS[status];

	  const classValue = `${type || 'neo-button'}--${statusText} neo-font--button--2 neo-font--text-capitalize`;
    
	  return (
	    <button
	      type="button"
	      className={classValue}
	      onClick={action}
	    >
        {
          icon ? this.setIcon({ type, icon, label }) : label
        }
	    </button>
	  );
  }
}

Button.propTypes = {
  ...defaultReactiveUIProps,
  config: PropTypes.shape({
    type: PropTypes.string,
    action: PropTypes.func,
    label: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape()
    ])
  }).isRequired
};

Button.defaultProps = {
  ...defaultReactiveUIDefaultProps
};

export default Button;
