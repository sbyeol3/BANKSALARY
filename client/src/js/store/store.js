const store = {
  auth: {
    token: localStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('token') ? true : false,
  },

  account: {
    month: new Date().getMonth + 1,
    tab: 0,
  },

  logInput: {
    kind: 1,
    date: null,
    price: 0,
    category: null,
    payment: null,
    contents: null,
  },

  select: {
    category: {
      in: [],
      out: [],
    },
    payment: [],
  },
};

export default store;
