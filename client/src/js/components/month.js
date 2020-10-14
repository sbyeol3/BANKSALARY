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
    this.parentElement.innerHTML += '<div>ddd</div>';
  }
}

export default Month;
