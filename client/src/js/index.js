import request from './util/api';
import action from './store/action';
import store from './store/store';
import authelement from './elements/auth';
import { doc } from 'prettier';

class Main {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.initializeEvent();
    this.initializeRedering();
  }

  initializeEvent() {}
  initializeRedering() {
    if (store.auth.isLoggedIn) {
      //
    } else {
      document.body.insertAdjacentHTML('afterend', authelement.LOGIN);
    }
  }
}

export default Main;
