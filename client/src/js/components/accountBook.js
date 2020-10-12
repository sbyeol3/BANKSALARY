import PaymentModal from './paymentModal';
import LogInput from './logInput';

class AccountBook {
  constructor() {
    this.element = document.createElement('article');
    this.logInput = new LogInput(this.element);
    this.modal = new PaymentModal();
  }

  insertHtml() {
    const logInputElement = this.logInput.getHtml();
    this.element.innerHTML = logInputElement;
    document.body.insertAdjacentElement('beforeend', this.element);
  }
}

export default AccountBook;
