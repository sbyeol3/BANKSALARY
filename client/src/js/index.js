import store from './store/store';
import Login from './components/login';
import AccountBook from './components/accountBook';

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
      const accountBook = new AccountBook();
      accountBook.insertHtml();
    } else {
      const login = new Login();
      login.initializeEvent();
    }
  }
}

export default Main;
