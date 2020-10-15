const store = {
  auth: {
    token: localStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('token') ? true : false,
  },

  account: {
    year: 2020,
    month: 10,
    tab: 0,
  },

  logInput: {
    kind: 1,
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

  details: {
    logs: [],
    total: {
      incomings: 0,
      outgoings: 0,
    },
  },

  statistics: {
    total: 0,
    byDate: [],
    byCategory: [],
  },
};

export default store;
