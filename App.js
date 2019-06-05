import React from 'react';
import GoSquid from './screens/index'
import { Provider } from 'react-redux'
import store from './store/index'

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={store} >
        <GoSquid />
      </Provider>
    );
  }
}