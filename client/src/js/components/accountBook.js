import PaymentModal from './paymentModal';
import Tab from './tab';
import LogInput from './logInput';

class AccountBook {
  constructor() {
    this.element = document.createElement('article');
    this.tab = new Tab(this.element);
    this.logInput = new LogInput(this.element);
    this.modal = new PaymentModal();
  }

  insertHtml() {
    const logInputElement = this.logInput.getHtml();
    const tabElement = this.tab.getHtml();
    this.element.innerHTML = tabElement + logInputElement;
    document.body.insertAdjacentElement('beforeend', this.element);
  }

  render() {
    this.logInput.render();
  } // add
}

export default AccountBook;
