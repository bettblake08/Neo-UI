import React from 'react';
import { shallow } from "enzyme";
import Button from ",/button";

describe("Basic Button ", () => {
  const defaultProps = {
    name: "saveButton",
    defaultStatus: 0,
    config: {
      type: "neo-button",
      label: "Save",
      action: jest.fn()
    }
  };
  
  const setup = (propsOverride) => {
    const newProps = { ...{ ...defaultProps, ...propsOverride}};
    const wrapper = shallow(<Button {...newProps}/>);
    return { wrapper, props: newProps };
  }

  it("renders as expected", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("calls the onClick action when clicked", () => {
    const { wrapper, props } = setup();
    wrapper.find('button').simulate('click');
    expect(props.config.action).toMatchSnapshot();
  });

});
