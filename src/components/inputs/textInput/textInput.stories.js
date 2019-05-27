import React from 'react';
import { storiesOf } from '@storybook/react';
import TextInput from "./textInput";
import BaseComponent from "../BaseComponent";
import TextInputConfig from "./notes/config.md"
import { loadNotes, getNotes } from "../../../helpers/storybook";

const Notes = loadNotes(
  require.context('./notes/', false, /\.md$/),
  [
    [ "{{textInputConfig}}", TextInputConfig ]
  ]
);

/**
 * Renders the text input component in different prop scenarios
 * @param object An object with props to override
 * @return JSX TextInput
*/
const setupTextInput = (configProps = {}) => (
  <TextInput
    defaultStatus={configProps.defaultStatus || 0}
    name="email"
    config={{
      floatingLabel: true,
      label: "Email Address",
      length: 30,
      placeholder: "Any placeholder",
      ...configProps
    }} />
);

storiesOf('Inputs/TextInput', module)
  .addDecorator(storyFunc => <BaseComponent>{storyFunc()}</BaseComponent>)
  .add('basic', () => setupTextInput(), getNotes(Notes.basicTextInput))
  .add('with comment', () => setupTextInput({
    comment: "This is a test comment."
  }), getNotes(Notes.basicWithComment))
  .add('with no placeholder', () => setupTextInput({
    placeholder: null
  }), getNotes(Notes.basicWithNoPlaceholder))
  .add('warning input', () => setupTextInput({
    placeholder: "Any placeholder",
    defaultStatus: 4
  }), getNotes(Notes.inputWithWarning));
