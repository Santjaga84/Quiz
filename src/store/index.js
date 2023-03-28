import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reduser/index';
import rootSaga from './../sagas/rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension';

//Подключение Redax saga и запуск middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

export default store;