/* eslint-disable import/first */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Button from "./button";
import BaseComponent from "../BaseComponent";
import ButtonConfigNotes from "./notes/buttonConfig.md";
import { loadNotes, getNotes } from "../../../helpers/storybook";

const Notes = loadNotes(
  require.context('./notes/', false, /\.md$/),
  [
    [ "{{ButtonConfig}}", ButtonConfigNotes ]
  ]);

/**
 * Renders the button in different prop scenarios
 * @param object An object with props to override
 * @return JSX Button
*/
const renderButton = (configOverride = {}) => (
  <Button
    name="saveButton"
    defaultStatus={configOverride.defaultStatus || 0}
    parent={{}}
    config={{
      type: "neo-button",
      label: text("Button label", "Save"),
      action: () => ({ actionStatus: 'success' }),
      ...configOverride
    }}
  />
);

storiesOf('Buttons/Generic', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFunc => <BaseComponent>{storyFunc()}</BaseComponent>)
  .add('on successful click action', () => renderButton(), getNotes(Notes.basicButton))
  .add('on failed click action', () => renderButton({ action: () => ({ actionStatus: 'fail' }) }), getNotes(Notes.basicButtonOnFail))
  .add('warning button', () => renderButton({ defaultStatus: 4 }), getNotes(Notes.warningButton))
  .add('danger button', () => renderButton({ defaultStatus: 5 }), getNotes(Notes.dangerButton) )
  .add('with Icon', () => renderButton({ icon: text("Icon name", "save") }), getNotes(Notes.basicButtonWithIcon));
