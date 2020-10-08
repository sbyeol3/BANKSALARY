import store from '../store/store';
import request from '../util/api';

const isValidData = (id, password) => {
  if (!id.trim() || !password.trim()) return false;
};

const submitLogin = () => {
  const id = document.getElementById('login-id');
  const password = document.getElementById('login-password');
  const validation = isValidData(id, password);
  if (!validation) return 'invalid';
};

export const onClickLogin = (e) => {
  const { target } = e;
  if (target.id === 'login-id') {
    //
  } else if (target.id === 'login-password') {
    //
  }
};

export const onChangeLogin = (e) => {
  const { target } = e;
  if (target.id === 'login-btn') {
    const submitResult = submitLogin();
  }
};

export const handleLogin = () => {
  const loginForm = document.getElementById('login');
  loginForm.addEventListener('click', onClickLogin);
  loginForm.addEventListener('change', onChangeLogin);
};
