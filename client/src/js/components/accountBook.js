import LogInput from './logInput';

class AccountBook {
  constructor() {
    this.element = document.createElement('article');
    this.logInput = new LogInput(this.element);
  }

  insertHtml() {
    const logInputElement = this.logInput.getHtml();
    this.element.innerHTML = logInputElement;
    document.body.insertAdjacentElement('beforeend', this.element);
  }
}

export default AccountBook;
