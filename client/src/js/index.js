import request from './util/api';
import action from './store/action';
import store from './store/store';
import $AUTH from './elements/auth';
import * as authEvent from './event/auth';

class Main {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.initializeRedering();
  }

  initializeEvent(isLoggedIn) {
    isLoggedIn ? '' : authEvent.handleLogin();
  }

  initializeRedering() {
    if (store.auth.isLoggedIn) {
      document.body.innerHTML = $AUTH.NAVBAR;
      this.initializeEvent(true);
    } else {
      document.body.innerHTML = $AUTH.NAVBAR + $AUTH.LOGIN;
      this.initializeEvent(false);
    }
  }
}

export default Main;
