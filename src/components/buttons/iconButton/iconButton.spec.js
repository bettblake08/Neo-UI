import React from 'react';
import { shallow } from "enzyme";
import waitForTest from "wait-for-expect";
import Button from "./iconButton";
import TestComponent from "../../../helpers/TestComponent";

jest.useFakeTimers();

describe("Icon Button ", () => {
  const defaultProps = {
    name: "saveButton",
    parent: TestComponent,
    config: {
      type: "neo-icon-button",
      icon: "save",
      action: jest.fn()
    }
  };
  
  const setup = (propsOverride) => {
    const newProps = { ...{ ...defaultProps, ...propsOverride}};
    const wrapper = shallow(<Button {...newProps}/>);
    return { wrapper, props: newProps };
  }

  /**
   * Tests the button according to different scenarios
   * @param object testCase Contains values for a specified scenario
  */
  const testButtonStatus = async (testCase) => {
    const { wrapper } = setup();
    wrapper.instance().setStatus(testCase.status);
    expect(wrapper.state('status')).toBe(testCase.statusNo);
    jest.runAllTimers();
    await waitForTest(() => {
      if(testCase.resetStatusNo) expect(wrapper.state('status')).toBe(0);
    });
  }

  it("renders as expected", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with JSX as icon", () => {
    const { wrapper } = setup({ config: {
      ...defaultProps.config,
      icon: <i className={`fas fa-save icon`} />,
      type: null
    }});
    expect(wrapper).toMatchSnapshot();
  });

  it("calls the onClick action when clicked", () => {
    const { wrapper, props } = setup();
    wrapper.find('.neo-icon-button--normal').simulate('click');
    expect(props.config.action).toHaveBeenCalled();
  });

  it("sets the state of the button to loading", () =>
    testButtonStatus({ status: 'loading', statusNo: 3 }));

  it("sets the state of the button to successful", () =>
    testButtonStatus({ status: 'success', statusNo: 2, resetStatusNo: 0 }));

  it("sets the state of the button to failed", () =>
    testButtonStatus({ status: 'fail', statusNo: 1, resetStatusNo: 0 }));

  it("sets the state of the button using invalid status", () =>
    testButtonStatus({ status: 'invalid', statusNo: 0, resetStatusNo: 0 }));

});
