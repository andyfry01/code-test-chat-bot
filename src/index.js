// React
import React from 'react';
import ReactDOM from 'react-dom'; 

// App Component
import App from './App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
