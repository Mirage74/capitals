import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'
import configStore from "./store";
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

const { store, persistor } = configStore();
export const _store = store;

ReactDOM.render(
    <Provider store={_store}>
        <PersistGate loading={(<h1>Loading...</h1>)} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root')
);


//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
