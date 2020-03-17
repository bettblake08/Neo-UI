import { configure } from '@storybook/react';
import "@fortawesome/fontawesome-free/css/all.css";

import "../src/styles/themes/default/index.scss";
import { addParameters } from '@storybook/react/dist/client/preview';


addParameters({
  options: {
    showAddonsPanel: true,
    enableShortcuts: true,
  }
})

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
