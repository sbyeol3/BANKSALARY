import PaymentModal from './paymentModal';
import Tab from './tab';
import LogInput from './logInput';
import { setTabValue } from '../store/action';
import reducer from '../store/reducer';
import store from '../store/store';

const tabValue = {
  breakdown: 0,
  monthly: 1,
  statistics: 2,
};

class AccountBook {
  constructor() {
    this.element = document.createElement('article');
    this.tab = new Tab(this.element);
    this.logInput = new LogInput(this.element);
    this.modal = new PaymentModal();
    this.addEvent();
  }

  addEvent() {
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  onClick(e) {
    const { target } = e;
    const { name } = target.dataset;
    const tabVal = tabValue[name];
    if (tabVal === undefined) return;
    if (store.account.tab === tabVal) return;

    reducer(setTabValue(tabVal));
    this.tab.changeSelectedTab(tabVal);
    this.render(tabVal);
  }

  insertHtml() {
    const logInputElement = this.logInput.getHtml();
    const tabElement = this.tab.getHtml();
    this.element.innerHTML = tabElement + logInputElement;
    document.body.insertAdjacentElement('beforeend', this.element);
  }

  removeAllChildNodes() {
    [...this.element.childNodes].map((node) => {
      const { id } = node;
      if (id === 'form') this.element.removeChild(node);
    });
  }

  render(tab = 0) {
    this.removeAllChildNodes();
    if (tab === 0) return this.logInput.render();
  }
}

export default AccountBook;
