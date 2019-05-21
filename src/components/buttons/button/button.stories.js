import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from "./button";
import BaseComponent from "../BaseComponent";

/**
 * Renders the button in different prop scenarios
 * @param object An object with props to override
 * @return JSX Button
*/
const renderButton = (configOverride = {}) => (
  <Button
    name="saveButton"
    defaultStatus={configOverride.defaultStatus || 0}
    config={{
      type: "neo-button",
      label: "Save",
      action: () => ({ actionStatus: 'success' }),
      ...configOverride
    }}
  />
);

storiesOf('Buttons/Generic', module)
  .addDecorator(storyFunc => <BaseComponent>{storyFunc()}</BaseComponent>)
  .add('on successful click action', () => renderButton())
  .add('on failed click action', () => renderButton({ action: () => ({ actionStatus: 'fail'}) }))
  .add('warning button', () => renderButton({ defaultStatus: 4 }))
  .add('danger button', () => renderButton({ defaultStatus: 5 }))
  .add('with Icon', () => renderButton({ icon: "save" }));
