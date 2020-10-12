const store = {
  auth: {
    token: localStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('token') ? true : false,
  },
  logInput: {
    kind: 0,
    date: null,
    price: 0,
    category: null,
    payment: null,
    contents: null,
  },
};

export default store;
