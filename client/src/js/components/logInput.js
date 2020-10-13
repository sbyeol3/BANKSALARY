import store from '../store/store';
import reducer from '../store/reducer';
import {
  setInCategories,
  setOutCategories,
  setPayments,
  setLogInput,
} from '../store/action';
import request from '../util/api';
import inputType from '../util/inputType';
import $LOGINPUT from '../elements/logInput';

class LogInput {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.selectOptions = {
      in: '',
      out: '',
      pay: '',
      default: $LOGINPUT.defaultOption,
    };
    this.addEvent(this.parentElement);
    this.getInCategories();
    this.getOutCategories();
    this.getPaymentMethods();
  }

  addEvent(parentElement) {
    parentElement.addEventListener('change', this.onChange.bind(this));
    parentElement.addEventListener('change', this.onClick.bind(this));
  }

  onChange(e) {
    const { target } = e;
    const { name, value } = target;
    this.updateInputs(name, value);

    if (name === 'kind') {
      const value = +target.value;
      this.changeCtgOptions(value);
      this.changePayOptions(value);
    }
  }

  onClick(e) {
    const { target } = e;
    if (target.id === 'log-input') return this.postLogForm(store.logInput);
  }

  addOptions(type) {
    if (this.selectOptions[type] === undefined) return;
    const dataCollections =
      type === 'pay' ? store.select.payment : store.select.category[type];
    const options = dataCollections.reduce((prev, row) => {
      const { code, title } = row;
      const element = `<option value=${code}>${title}</option>`;
      return prev + element;
    }, '<option selected disabled>선택하세요</option>');
    this.selectOptions[type] = options;
  }

  changeCtgOptions(kind) {
    const selectElement = document.getElementById('ctg-select');
    const type = kind ? 'in' : 'out';
    selectElement.innerHTML = this.selectOptions[type];
  }

  changePayOptions(kind) {
    const selectElement = document.getElementById('pay-select');
    const type = kind ? 'default' : 'pay';
    selectElement.innerHTML = this.selectOptions[type];
  }

  async getInCategories() {
    const config = {
      uri: '/api/category/0',
      method: 'GET',
    };
    const { success, data: body } = await request(config);
    if (success) {
      const { data } = body;
      console.log(data);
      reducer(setInCategories(data));
      this.addOptions('in');
    }
  }

  async getOutCategories() {
    const config = {
      uri: '/api/category/1',
      method: 'GET',
    };
    const { success, data: body } = await request(config);
    if (success) {
      const { data } = body;
      console.log(data);
      reducer(setOutCategories(data));
      this.addOptions('out');
    }
  }

  async getPaymentMethods() {
    const config = {
      uri: '/api/payment',
      method: 'GET',
    };
    const { success, data: body } = await request(config);
    if (success) {
      const { data } = body;
      console.log(data);
      reducer(setPayments(data));
      this.addOptions('pay');
    }
  }

  async postLogForm(data) {
    const config = {
      uri: '/api/log',
      method: 'POST',
      data,
    };
    const { success, data: body } = await request(config);
    if (success) {
      const { data } = body;
      console.log(data);
      location.reload();
    }
  }

  updateInputs(name, value) {
    const valueType = inputType[name];
    if (!valueType) return;
    const convertedVal = valueType === Number ? +value : value;
    reducer(setLogInput(name, convertedVal));
  }

  clearInputs() {
    /* TODO : form input reset */
  }

  getHtml() {
    return $LOGINPUT.logForm;
  }
}

export default LogInput;
