import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import '@arco-design/web-react/dist/css/arco.css';
import 'react-device-frameset/styles/marvel-devices.min.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <App />
      </Provider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
