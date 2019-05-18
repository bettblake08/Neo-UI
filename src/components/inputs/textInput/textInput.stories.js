import React from 'react';
import { storiesOf } from '@storybook/react';
import TextInput from "./textInput";
import BaseComponent from "../BaseComponent";

storiesOf('Inputs/TextInput', module)
  .addDecorator(storyFunc => <BaseComponent>{storyFunc()}</BaseComponent>)
  .add('basic', () => 
    <TextInput
      defaultStatus={0}
      config={{
        text: "",
        floatingLabel: true,
        label: "Name",
        type: "neo-text-input",
        placeholder: "Brian Bett",
        length: 30
      }} />
  ).add('basic with comment', () =>
    <TextInput
      defaultStatus={0}
      config={{
        text: "",
        floatingLabel: true,
        label: "Name",
        type: "neo-text-input",
        placeholder: "Brian Bett",
        comment: "This is a test comment.",
        length: 30
      }} />
  );
// ).add('warning button', () =>
//   <TextInput
//     defaultStatus={0}
//     config={{
//       text: "",
//       floatingLabel: true,
//       label: "Name",
//       type: "text_input_4",
//       placeholder: "Firstname / Surname",
//       length: 30
//     }} />
// );
