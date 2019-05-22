import { configure } from '@storybook/react';
import "../src/styles/themes/default/default.scss";
import "@fortawesome/fontawesome-free/css/all.css";

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
