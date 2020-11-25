import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import modules from './modules';

const configure = () => {
  const store = createStore(modules, composeWithDevTools());
  return store;
};

export default configure;
