import { configure } from '@storybook/react';
import "@fortawesome/fontawesome-free/css/all.css";

import "../src/styles/themes/default/index.scss";

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
