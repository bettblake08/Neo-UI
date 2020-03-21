import '@storybook/addon-knobs/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@storybook/addon-notes/register';
import '@storybook/addon-storysource/register';

import { addons } from "@storybook/addons";
import { create } from "@storybook/theming/create";
import brandImage from "../src/assets/Logo1.png";

addons.setConfig({
  theme: create({
    base: "light",

    colorPrimary: "#17b978",
    colorSecondary: "#a7ff83",

    // UI
    appBg: "white",
    appContentBg: "white",
    appBorderColor: "#086972",
    appBorderRadius: 0,

    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: "monospace",

    // Text colors
    textColor: "black",
    textInverseColor: "rgba(0,0,0,0.9)",

    // Toolbar default and active colors
    barTextColor: "#a7ff83",
    barSelectedColor: "#a7ff83",
    barBg: "#086972",

    // Form colors
    inputBg: "white",
    inputBorder: "#a7ff83",
    inputTextColor: "#17b978",
    inputBorderRadius: 4,

    brandTitle: "Neo UI Documentation",
    brandUrl: "https://neo-ui-react.netlify.com",
    brandImage
  })
});
