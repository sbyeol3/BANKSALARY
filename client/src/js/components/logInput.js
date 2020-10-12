import store from '../store/store';
import request from '../util/api';

class LogInput {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.addEvent(this.parentElement);
  }

  addEvent(parentElement) {
    parentElement.addEventListener('change', this.onChange);
    parentElement.addEventListener('change', this.onClick);
  }

  onChange(e) {}

  onClick(e) {}

  async getPaymentMethods() {
    const config = {
      uri: '/payment',
      method: 'GET',
    };
    const response = await request(config);
  }
  async getCategories() {}

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
