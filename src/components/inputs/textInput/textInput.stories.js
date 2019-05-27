import React from 'react';
import { storiesOf } from '@storybook/react';
import TextInput from "./textInput";
import BaseComponent from "../BaseComponent";


const setupTextInput = (configProps = {}) => (
  <TextInput
    defaultStatus={configProps.defaultStatus || 0}
    name="name"
    config={{
      text: "",
      floatingLabel: true,
      label: "Name",
      type: "neo-text-input",
      length: 30,
      ...configProps
    }} />
);

storiesOf('Inputs/TextInput', module)
  .addDecorator(storyFunc => <BaseComponent>{storyFunc()}</BaseComponent>)
  .add('basic', () => setupTextInput())
  .add('basic with comment', () => setupTextInput({
    comment: "This is a test comment."
  }))
  .add('basic with placeholder', () => setupTextInput({
    placeholder: "Any placeholder"
  }))
  .add('warning input', () => setupTextInput({
    placeholder: "Any placeholder",
    defaultStatus: 4
  }));
