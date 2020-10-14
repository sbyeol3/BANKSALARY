import Month from './month';
import PaymentModal from './paymentModal';
import Tab from './tab';
import LogInput from './logInput';
import Details from './details';
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
    this.element.classList.add('account');
    this.month = new Month(this.element);
    this.tab = new Tab(this.element);
    this.logInput = new LogInput(this.element);
    this.details = new Details(this.element);
    this.modal = new PaymentModal();
    this.addEvent();
  }

  addEvent() {
    this.element.addEventListener('click', (e) => {
      this.onClick(e);
      this.onClickMonth(e);
    });
  }

  onClickMonth(e) {
    const { target } = e;
    if (target.id === 'month-before') {
      //
    } else if (target.id === 'month-after') {
      //
    }
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

  initialzeHTML() {
    const monthElement = this.month.getHtml();
    const tabElement = this.tab.getHtml();
    const logInputElement = this.logInput.getHtml();
    this.element.innerHTML = monthElement + tabElement + logInputElement;
    document.body.insertAdjacentElement('beforeend', this.element);
  }

  removeAllChildNodes() {
    const deletedId = ['form', 'details'];
    [...this.element.childNodes].forEach((node) => {
      const { id } = node;
      if (deletedId.includes(id)) this.element.removeChild(node);
    });
  }

  render(tab = 0) {
    this.removeAllChildNodes();
    if (tab === 0) {
      this.logInput.render();
      this.details.render();
    }
  }
}

export default AccountBook;
