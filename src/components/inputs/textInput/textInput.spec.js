import React from 'react';
import { shallow, mount } from "enzyme";
import waitForTest from "wait-for-expect";
import TextInput from "./textInput";
import TestComponent from "../../../helpers/TestComponent";
import Regex from "../../../helpers/regex";

describe("TextInput ", () => {
  const defaultProps = {
    name: "Name",
    defaultStatus: 0,
    parent: TestComponent,
    config: {
      text: "",
      floatingLabel: true,
      label: "Name",
      type: "neo-text-input",
      placeholder: "Brian Bett",
      length: 30
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
    const wrapper = shouldMount ? mount(<TextInput {...newProps} />) : shallow(<TextInput {...newProps} />);
    return { wrapper, props: newProps };
  }

  /** 
   * Tests the text input according to different scenarios
   * @param object testCase Contains values for a specified scenario
   * @param function testInputSpy A mock function to test an input check by using a function
  */
  const testTextInput = async (testCase, testInputSpy = null) => {
    const { wrapper } = setup({ config: { ...defaultProps.config, testInput: testCase.testInput } });
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: testCase.value} });
    await waitForTest(() => {
      if (testInputSpy) expect(testInputSpy).toHaveBeenCalled();
      expect(wrapper.state('status')).toBe(testCase.status);
      expect(wrapper.instance().isValid()).toBe(testCase.status === 5);
    });
  }

  /** 
   * Tests the set status method according to different scenarios
   * @param object testCase Contains the values for a specified scenario
  */
  const testSetStatusMethod = testCase => {
    const { wrapper } = setup({ config: { ...defaultProps.config } });
    wrapper.instance().setStatus(...testCase.params);
    expect(wrapper.state('status')).toBe(testCase.statusNo);
  }

  it("renders as expected", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders with minimal config props", async () => {
    const { wrapper } = setup({
      config: {
        ...defaultProps.config,
        length: null,
        label: null,
        placeholder: null,
        floatingLabel: false
      }
    }, true);
    expect(wrapper).toMatchSnapshot();
  });

  it("calls the onChange action when function test is valid", async () => {
    const testInputSpy = jest.fn();
    const testInput = inputValue => {
      testInputSpy();
      return Regex.email.test(inputValue)
    };
    await testTextInput({ testInput, value: "johndoe@emai", status: 5 }, testInputSpy);
    await testTextInput({ testInput, value: "johndoe@email.com", status: 6 }, testInputSpy);
  });

  it("calls the onChange action when regex test is valid", async () => {
    await testTextInput({ testInput: Regex.email ,value: "johndoe@emai", status: 5});
    await testTextInput({ testInput: Regex.email ,value: "johndoe@email.com", status: 6 });
  });

  it("calls the onChange action when regex name test is valid", async () => {
    await testTextInput({ testInput: "email", value: "johndoe@emai", status: 5 });
    await testTextInput({ testInput: "email", value: "johndoe@email.com", status: 6 });
  });

  it("focus on input successfully", async () => {
    const { wrapper } = setup(null, true);
    const spyOnInputFocus = jest.spyOn(wrapper.instance().textInputRef.current, 'focus');
    wrapper.instance().focus();
    expect(spyOnInputFocus).toHaveBeenCalled();
  });

  it("sets the state of the input as valid", async () => testSetStatusMethod({ params: ['success:fixed'], statusNo: 6 }));

  it("sets the state of the input as invalid", async () => testSetStatusMethod({ params: ['fail:fixed', 'Invalid input'], statusNo: 5 }));

  it("sets the state of the input with invalid status", async () => testSetStatusMethod({ params: ['correct:fixed' ], statusNo: 0 }));

});
