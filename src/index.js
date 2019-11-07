import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom-styles/start-meter.css';
import './custom-styles/summary-chart.css';
import './custom-styles/timeline-chart.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-less/semantic.less';
import { BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
<Router>

<App />

</Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
