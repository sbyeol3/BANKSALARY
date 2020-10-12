import store from '../store/store';
import reducer from '../store/reducer';
import {
  setInCategories,
  setOutCategories,
  setPayments,
} from '../store/action';
import request from '../util/api';

class LogInput {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.selectOptions = {
      in: '',
      out: '',
      pay: '',
      default: '<option selected disabled>선택하세요</option>',
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
    if (target.name === 'kind') {
      const value = +target.value;
      this.changeCtgOptions(value);
      this.changePayOptions(value);
    }
  }

  onClick(e) {}

  addOptions(type) {
    if (type === 'IN') {
      const { in: inCategories } = store.select.category;
      const options = inCategories.reduce((prev, category) => {
        const { code, title } = category;
        const element = `<option value=${code}>${title}</option>`;
        return prev + element;
      }, '<option selected disabled>선택하세요</option>');
      this.selectOptions.in = options;
    } else if (type === 'OUT') {
      const { out: outCategories } = store.select.category;
      const options = outCategories.reduce((prev, category) => {
        const { code, title } = category;
        const element = `<option value=${code}>${title}</option>`;
        return prev + element;
      }, '<option selected disabled>선택하세요</option>');
      this.selectOptions.out = options;
    } else {
      const { payment: payments } = store.select;
      const options = payments.reduce((prev, payment) => {
        const { code, title } = payment;
        const element = `<option value=${code}>${title}</option>`;
        return prev + element;
      }, '<option selected disabled>선택하세요</option>');
      this.selectOptions.pay = options;
    }
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
      this.addOptions('IN');
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
      this.addOptions('OUT');
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
      this.addOptions('PAY');
    }
  }

  getHtml() {
    return `
      <div class='form-section'>
            <form id='log-form' class='log-form'>
                <fieldset class='inputs radios'>
                    <label class='label' for='kind'>분류</label>
                    <input type='radio' name='kind' value=1 class='radio-input' selected >수입
                    <input type='radio' name='kind' value=0 class='radio-input'>지출
                </fieldset>
                <fieldset class='inputs'>
                    <label class='label'>날짜</label>
                    <input type='text' name='logDate' class='txt-input'>
                    <label class='label' for='category'>카테고리</label>
                    <select id='ctg-select' name='category' class='select'>
                        <option selected disabled>선택하세요</option>
                    </select>
                    <label class='label' for='payment'>결제수단</label>
                    <select id='pay-select' name='payment' class='select'>
                        <option selected disabled>선택하세요</option>
                    </select>
                </fieldset>
                <fieldset class='inputs'>
                    <label class='label' for='price'>금액</label>
                    <input type='text' name='price' class='txt-input'>
                    <label class='label' for='contents'>내용</label>
                    <input type='text' name='contents' class='txt-input contents'>
                </fieldset>
                <button id='log-submit' class='btn'>확인</button>
            </form>
        </div>
      `;
  }
}

export default LogInput;
