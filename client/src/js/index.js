import store from './store/store';
import Login from './components/login';
import AccountBook from './components/accountBook';
import reducer from './store/reducer';
import { removeAuthToken } from './store/action';

class Main {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.initializeRedering();
    this.initializeEvent();
  }

  initializeEvent() {
    document.body.addEventListener('click', this.onClickLogout.bind(this));
  }

  initializeRedering() {
    if (store.auth.isLoggedIn) {
      const accountBook = new AccountBook();
      accountBook.insertHtml();
    } else {
      const login = new Login();
      login.initializeEvent();
    }
  }

  onClickLogout(e) {
    const { target } = e;
    if (target.id === 'logout') {
      reducer(removeAuthToken());
      this.initializeRedering();
    }
  }
}

export default Main;
