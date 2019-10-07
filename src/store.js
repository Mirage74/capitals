import { createStore, compose, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import {KEY_PERSIST_STORE} from './config'


const persistConfig = {
  key: KEY_PERSIST_STORE,
  storage,
  blacklist: ['session'],
  whitelist: ['auth', 'listCapitals'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

//const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancer = compose;

export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(thunk)),
  )
  let persistor = persistStore(store)
  return { store, persistor }
}

