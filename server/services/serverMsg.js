exports.success = {
  signin: 'LOGIN SUCCESS : Login request is successfully processed',
  signout: 'LOGOUT SUCCESS : Logout request is successfully processed',
  read: 'GET SUCCESS : The request is successfully processed',
  create: 'CREATE SUCCESS : create request is successfully processed',
  delete: 'DELETE SUCCESS : The data is successfully deleted',
};
exports.error = {
  invalidRequest: 'INVALID REQUEST : Not Received the necessary data',
  invalidCode: 'INVALID REQUEST : Not Received proper code',
  internal: 'INTERNAL SERVER ERROR : Unexpected internal error occured',
  datebase: 'DATEBASE ERROR : Unexpected error of Database occured',
  siginin: 'LOGIN ERROR: Received Wrong User Id or password',
  unauthorized: 'PERMISSION ERROR : Received unauthorized request',
  unprocessable: 'UNPROCESSABLE ERROR : An invalid request is entered',
};
