/* eslint-disable import/first */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import PasswordInput from "./newPasswordInput";
import BaseComponent from "../../baseComponent";
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
 * @return JSX PasswordInput
*/
const setupPasswordInput = (configProps = {}) => (
  <PasswordInput
    name="password"
    parent={{}}
    config={{
      floatingLabel: boolean('Enable floating label', true),
      placeholder: text("Placeholder", "At least 1 of each (A-Z),(a-z),(1-9),(@$.#). 8-16 characters."),
      ...configProps
    }} />
);

storiesOf('Inputs/PasswordInput', module)
  .addDecorator(storyFunc => <BaseComponent>{storyFunc()}</BaseComponent>)
  .addDecorator(withKnobs)
  .add('basic', () => setupPasswordInput(), getNotes(Notes.basicTextInput))
  .add('with no placeholder', () => setupPasswordInput({ placeholder: null}), getNotes(Notes.basicWithNoPlaceholder));
