/* eslint-disable import/first */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import IconButton from "./iconButton";
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
 * @return JSX IconButton
*/
const renderButton = (configOverride = {}) => (
  <IconButton
    name="saveButton"
    defaultStatus={configOverride.defaultStatus || 0}
    parent={{}}
    config={{
      icon: "save",
      action: () => ({ actionStatus: 'success' }),
      ...configOverride
    }}
  />
);

storiesOf('Buttons/IconButton', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFunc => <BaseComponent type='icon'>{storyFunc()}</BaseComponent>)
  .add('on successful click action', () => renderButton(), getNotes(Notes.basicButton))
  .add('on failed click action', () => renderButton({ action: () => ({ actionStatus: 'fail' }) }), getNotes(Notes.basicButtonOnFail))
  .add('warning button', () => renderButton({ defaultStatus: 4 }), getNotes(Notes.warningButton))
  .add('danger button', () => renderButton({ defaultStatus: 5 }), getNotes(Notes.dangerButton) )
