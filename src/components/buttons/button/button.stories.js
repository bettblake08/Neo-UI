import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from "./button";
import BaseComponent from "../BaseComponent";

storiesOf('Buttons/Generic', module)
  .addDecorator(storyFunc => <BaseComponent>{storyFunc()}</BaseComponent>)
  .add('on successful click action', () => 
    <Button
      name="saveButton"
      defaultStatus={0}
      config={{
        type: "neo-button",
        label: "Save",
        action: () => ({ actionStatus: 'success' })
      }}
    />
  ).add('on failed click action', () =>
    <Button
      name="saveButton"
      defaultStatus={0}
      config={{
        type: "neo-button",
        label: "Save",
        action: () => ({ actionStatus: 'fail' })
      }}
    />
  ).add('warning button', () =>
    <Button
      name="saveButton"
      defaultStatus={4}
      config={{
        type: "neo-button",
        label: "Save",
        action: () => ({ actionStatus: 'success' })
      }}
    />
  );
