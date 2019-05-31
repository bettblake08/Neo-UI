import React, { Component } from "react";
import PropTypes from "prop-types";

import Helpers, {
  STATUS_STRINGS,
  COMPONENT_STATUS_CLASS,
  defaultReactiveUIProps,
  defaultReactiveUIDefaultProps
} from "../../../helpers";

class IconButton extends Component {
  constructor(props){
    super(props);

    this.state = {
      status: props.defaultStatus || 0
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
      status:  statusIndex > 0 ? statusIndex : 0
    });
  }

  renderIcon = icon => {
    if (typeof icon === 'string') return (<i className={`fas fa-${icon} icon`} />);
    return icon;
  }

  render() {
    const { config: { type = 'neo-icon-button', icon, action } } = this.props;
    const { status } = this.state;
    const statusText = COMPONENT_STATUS_CLASS[status]; 

    return (
      <div className={`${type} ${type}--${statusText}`} onClick={action}>
        {this.renderIcon(icon)}
      </div>
    );
  }
}

IconButton.propTypes = {
  ...defaultReactiveUIProps,
  config: PropTypes.shape({
    type: PropTypes.string,
    action: PropTypes.func,
    label: PropTypes.string
  }).isRequired
};

IconButton.defaultProps = {
  ...defaultReactiveUIDefaultProps
};

export default IconButton;
