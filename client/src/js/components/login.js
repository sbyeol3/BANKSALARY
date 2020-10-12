import request from '../util/api';
import reducer from '../store/reducer';
import { setAuthToken } from '../store/action';
import $AUTH from '../elements/auth';

class Login {
  constructor() {
    this.insertHTML();
  }

  insertHTML() {
    document.body.innerHTML = $AUTH.NAVBAR + $AUTH.LOGIN;
  }

  initializeEvent() {
    const loginForm = document.getElementById('login');
    loginForm.addEventListener('click', this.onClickLogin.bind(this));
    loginForm.addEventListener('change', this.onChangeLogin.bind(this));
  }

  isValidData(id, password) {
    if (!id.trim() || !password.trim()) return false;
    return true;
  }

  async submitLogin() {
    const id = document.getElementById('login-id').value;
    const password = document.getElementById('login-password').value;
    const validation = this.isValidData(id, password);
    if (!validation) return 'invalid';

    const config = {
      uri: '/signin',
      method: 'POST',
      data: { username: id, password },
    };
    const { success, status, data } = await request(config);
    if (status === 403) return 'wrong';
    if (success) return data;
  }

  onChangeLogin(e) {
    const { target } = e;
    if (target.id === 'login-id') {
      //
    } else if (target.id === 'login-password') {
      //
    }
  }

  async onClickLogin(e) {
    const { target } = e;
    if (target.id === 'login-btn') {
      console.log(target);
      const submitResult = await this.submitLogin();
      console.log(submitResult);
      if (submitResult === 'invalid') {
        this.handleWrongInput();
      } else if (submitResult === 'wrong') {
        this.handleWrongInput();
      } else {
        const { token } = submitResult;
        reducer(setAuthToken(token));
        location.reload();
      }
    }
  }

  handleWrongInput() {}
}

export default Login;
