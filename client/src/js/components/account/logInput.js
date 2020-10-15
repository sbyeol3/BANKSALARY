import store from '../../store/store';
import reducer from '../../store/reducer';
import {
  setInCategories,
  setOutCategories,
  setPayments,
  setLogInput,
  resetLogInput,
} from '../../store/action';
import request from '../../util/api';
import inputType from '../../util/inputType';
import $LOGINPUT from '../../elements/logInput';

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
    this.render();
  }

  addEvent(parentElement) {
    parentElement.addEventListener('change', this.onChange.bind(this));
    parentElement.addEventListener('click', this.onClick.bind(this));
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
    if (target.id === 'log-submit') {
      this.postLogForm(store.logInput);
    } else if (target.id === 'edit-btn') {
      this.fillInputsByEdit(target.dataset);
    } else if (target.id === 'reset') {
      this.clearInputs();
    }
  }

  addOptions(type) {
    if (this.selectOptions[type] === undefined) return;
    const dataCollections =
      type === 'pay' ? store.select.payment : store.select.category[type];
    const options = dataCollections.reduce((prev, row) => {
      const { code, title } = row;
      const element = `<option value=${code}>${title}</option>`;
      return prev + element;
    }, $LOGINPUT.defaultOption);
    this.selectOptions[type] = options;
  }

  changeCtgOptions(kind) {
    const selectElement = document.getElementById('ctg-select');
    const type = kind ? 'out' : 'in';
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

  fillInputsByEdit() {
    /* TODO : fill form input */
  }

  clearInputs() {
    const inputElements = document.body.querySelectorAll('.txt-input');
    const selectElements = document.body.querySelectorAll('select');
    inputElements.forEach((input) => (input.value = ''));
    selectElements.forEach((input) => (input.childNodes[0].selected = true));
    reducer(resetLogInput());
  }

  getHtml() {
    return $LOGINPUT.logForm;
  }

  render() {
    this.getInCategories();
    this.getOutCategories();
    this.getPaymentMethods();
    this.parentElement.innerHTML += this.getHtml();
    this.element = document.getElementById('form');
  }
}

export default LogInput;
