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
    this.addEvent(this.parentElement);
    this.getInCategories();
    this.getOutCategories();
    this.getPaymentMethods();
  }

  addEvent(parentElement) {
    parentElement.addEventListener('change', this.onChange);
    parentElement.addEventListener('change', this.onClick);
  }

  onChange(e) {}

  onClick(e) {}

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
    }
  }

  getHtml() {
    return `
      <div class='form-section'>
            <form id='log-form' class='log-form'>
                <fieldset class='inputs radios'>
                    <label class='label' for='kind'>분류</label>
                    <input type='radio' name='kind' class='radio-input'>수입
                    <input type='radio' name='kind' class='radio-input'>지출
                </fieldset>
                <fieldset class='inputs'>
                    <label class='label'>날짜</label>
                    <input type='text' name='logDate' class='txt-input'>
                    <label class='label' for='category'>카테고리</label>
                    <select nmae='category' class='select'>
                        <option>선택하세요</option>
                    </select>
                    <label class='label' for='payment'>결제수단</label>
                    <select nmae='payment' class='select'>
                        <option>선택하세요</option>
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
