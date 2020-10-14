import store from '../store/store';
import $MONTH from '../elements/common';

class Month {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  getHtml() {
    return $MONTH.month(store.account.month);
  }

  render() {
    const { month } = store.account;
    document.getElementById('month-val').innerHTML = `${month}월`;
  }
}

export default Month;
