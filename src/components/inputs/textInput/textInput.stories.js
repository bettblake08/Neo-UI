/* eslint-disable import/first */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import TextInput from "./textInput";
import BaseComponent from "../BaseComponent";
import TextInputConfig from "./notes/config.md"
import { loadNotes, getNotes } from "../../../helpers/storybook";
import Regex from "../../../helpers/regex";


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
    parent={{}}
    config={{
      floatingLabel: boolean("Enable floating label", true),
      comment: text("Comment", null),
      label: text("Input label", "Email Address"),
      length: number("Input length", 30),
      placeholder: text("Placeholder", "Any placeholder"),
      testInput: Regex.email,
      ...configProps
    }} />
);

storiesOf('Inputs/TextInput', module)
  .addDecorator(storyFunc => <BaseComponent>{storyFunc()}</BaseComponent>)
  .addDecorator(withKnobs)
  .add('basic', () => setupTextInput(), getNotes(Notes.basicTextInput))
  .add('with comment', () => setupTextInput({
    comment: text("Comment", "This is a test comment.")
  }), getNotes(Notes.basicWithComment))
  .add('with no placeholder', () => setupTextInput({
    placeholder: null
  }), getNotes(Notes.basicWithNoPlaceholder))
  .add('warning input', () => setupTextInput({
    placeholder: "Any placeholder",
    defaultStatus: 4
  }), getNotes(Notes.inputWithWarning));
