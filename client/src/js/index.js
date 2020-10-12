import store from './store/store';
import $AUTH from './elements/auth';
import Login from './components/login';

class Main {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.initializeRedering();
  }

  initializeEvent() {}

  initializeRedering() {
    if (store.auth.isLoggedIn) {
      document.body.innerHTML = $AUTH.NAVBAR;
      this.initializeEvent(true);
    } else {
      const login = new Login();
      login.initializeEvent();
    }
  }
}

export default Main;
