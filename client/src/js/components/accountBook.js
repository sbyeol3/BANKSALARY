import Month from './month';
import PaymentModal from './paymentModal';
import Tab from './tab';
import LogInput from './account/logInput';
import Details from './account/details';
import Statistics from './statistics';
import { setTabValue, setMonth, setYear } from '../store/action';
import reducer from '../store/reducer';
import store from '../store/store';

const tabValue = {
  breakdown: 0,
  monthly: 1,
  statistics: 2,
};

const detailsValue = {
  onlyIn: 0,
  onlyOut: 1,
  all: 2,
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
    this.statistics = new Statistics(this.element);
    this.detailsNumber = detailsValue.all;
    this.addEvent();
  }

  addEvent() {
    this.element.addEventListener('click', (e) => {
      this.onClick(e);
      this.onClickMonth(e);
    });
    this.element.addEventListener('change', (e) => this.onChangeCheckBox(e));
  }

  onClickMonth(e) {
    const { target } = e;
    const { month, tab } = store.account;
    if (target.id === 'month-before' || target.id === 'month-after') {
      const { year } = store.account;
      let newMonth = target.id === 'month-before' ? month - 1 : month + 1;
      if (newMonth === 0) {
        newMonth = 12;
        reducer(setYear(year - 1));
      } else if (newMonth === 13) {
        newMonth = 1;
        reducer(setYear(year + 1));
      }
      reducer(setMonth(newMonth));
      this.month.render();
      this.render(tab);
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

  onChangeCheckBox(e) {
    const { target } = e;
    const { name } = target;
    if (name === 'incomings') {
      const val =
        this.detailsNumber === detailsValue.all
          ? detailsValue.onlyOut
          : detailsValue.all;
      this.detailsNumber = val;
      this.render(0, this.detailsNumber);
    } else if (name === 'outgoings') {
      const val =
        this.detailsNumber === detailsValue.all
          ? detailsValue.onlyIn
          : detailsValue.all;
      this.detailsNumber = val;
      this.render(0, this.detailsNumber);
    }
  }

  initialzeHTML() {
    const monthElement = this.month.getHtml();
    const tabElement = this.tab.getHtml();
    const logInputElement = this.logInput.getHtml();
    this.element.innerHTML = monthElement + tabElement + logInputElement;
    document.body.insertAdjacentElement('beforeend', this.element);
  }

  removeAllChildNodes() {
    const deletedId = ['form', 'details', 'total', 'statistics'];
    [...this.element.childNodes].forEach((node) => {
      const { id } = node;
      if (deletedId.includes(id)) this.element.removeChild(node);
    });
  }

  render(tab = 0, checked = detailsValue.all) {
    this.removeAllChildNodes();
    if (tab === 0) {
      this.logInput.render();
      this.details.render(checked);
    } else if (tab === 2) {
      this.statistics.render();
    }
  }
}

export default AccountBook;
