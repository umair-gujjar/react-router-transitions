import React from 'react';
import {render} from 'react-dom';
import Main from 'Main';

require('normalize.css');
require('stylesheet.css');
require('github-light.css');

render(<Main />, document.getElementById('main'));
