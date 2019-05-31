import React from 'react';
import { shallow, mount } from "enzyme";
import waitForTest from "wait-for-expect";
import PasswordInput from "./newPasswordInput";
import TestComponent from "../../../helpers/TestComponent";
import Regex from "../../../helpers/regex";


describe("TextInput ", () => {
  jest.useFakeTimers();

  const defaultProps = {
    name: "password",
    parent: TestComponent,
    config: {
      placeholder: "Any placeholder"
    }
  };

  /**
   * Sets up a enzyme wrapper
   * @param object PropsOverride A object of values used to override the props passed into the component being tested
   * @param boolean shouldMount A bool value to select which type of wrapper to create
   * @return object { wrapper, props }
  */
  const setup = (propsOverride, shouldMount = false) => {
    const newProps = { ...{ ...defaultProps, ...propsOverride } };
    const wrapper = shouldMount ? mount(<PasswordInput {...newProps} />) : shallow(<PasswordInput {...newProps} />);
    return { wrapper, props: newProps };
  }

  /** 
   * Tests the text input according to different scenarios
   * @param object testCase Contains values for a specified scenario
   * @param function testInputSpy A mock function to test an input check by using a function
  */
  const testPasswordInput = async (testCase) => {
    const { wrapper } = setup({ config: { ...defaultProps.config, testInput: testCase.testInput } }, true);

    const inputs = wrapper.find('input');

    inputs.at(0).simulate('change', { target: { value: testCase.password } });
    inputs.at(1).simulate('change', { target: { value: testCase.repass } });
    jest.runAllTimers();

    await waitForTest(() => {
      expect(wrapper.instance().isValid()).toBe(false);
    });

    inputs.at(0).simulate('change', { target: { value: testCase.password } });
    inputs.at(1).simulate('change', { target: { value: testCase.password } });
    jest.runAllTimers();

    await waitForTest(() => {
      expect(wrapper.instance().isValid()).toBe(true);
      expect(wrapper.instance().getValue()).toBe(testCase.password);
    });
  }

  it("renders as expected", () => {
    const { wrapper } = setup();
    wrapper.setState({ lastChanged: 0 }, () => expect(wrapper).toMatchSnapshot());
  });

  it("tests inputs using a valid regex test", async () => {
    jest.clearAllTimers();
    await testPasswordInput({ testInput: Regex.password, password: "johndoe@J5", repass: "johndoe@J"});
  });

  it("focus on input successfully", async () => {
    const { wrapper } = setup(null, true);
    const spyOnInputFocus = jest.spyOn(wrapper.state('passwordInputs').password.textInputRef.current, 'focus');
    wrapper.instance().focus();
    expect(spyOnInputFocus).toHaveBeenCalled();
  });
});
