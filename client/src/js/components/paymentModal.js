import request from '../util/api';
import store from '../store/store';

class PaymentModal {
  constructor() {
    document.body.innerHTML += this.getHtml();
    this.addEvent();
  }

  insertPayments() {
    const payListElement = document.getElementById('pay-list');
    const rows = store.select.payment.reduce((prev, pay) => {
      const element = this.getRowElement(pay);
      return prev + element;
    }, '');
    payListElement.innerHTML = rows;
  }

  getRowElement(payment) {
    const { code, title } = payment;
    return `
    <div class='row'>
      <span class='pay-val'>${title}</span>
      <span class='delete' data-name='delete' data-code=${code}>✕</span>
    </div>`;
  }

  addEvent() {
    document.body.addEventListener('click', this.handleModal.bind(this));
  }

  handleModal(e) {
    const { target } = e;
    const { id, dataset } = target;
    if (id === 'payment-config' || id === 'modal') return this.toggleModal();
    if (id === 'add-payment') return this.submitModal();
    if (dataset.name === 'delete') return this.deleteModal(dataset.code);
  }

  toggleModal() {
    const modal = document.getElementById('modal');
    this.insertPayments();
    if (modal.style.visibility === 'hidden') modal.style.visibility = 'visible';
    else modal.style.visibility = 'hidden';
  }

  async submitModal() {
    const paymentName = document.getElementById('payname').value;
    if (!paymentName.trim()) return;
    const config = {
      uri: '/api/payment',
      method: 'POST',
      data: { title: paymentName },
    };
    const { success } = await request(config);
    if (success) return location.reload();
  }

  async deleteModal(code) {
    const config = {
      uri: '/api/payment/' + code,
      method: 'DELETE',
    };
    const { success } = await request(config);
    if (success) return location.reload();
  }

  getHtml() {
    return `
        <div id='modal' class='modal' style='visibility:hidden;'>
            <div class='modal-form'>
                <h1 class='title'>결제 수단 관리</h1>
                <div class='add-form'>
                    <label class='label' for='payment'>결제수단 이름</label>
                    <input id='payname' class='input' name='payment' type='text'>
                    <button id='add-payment'>등록</button>
                </div>
                <div id='pay-list' class='pay-list'>
                </div>
            </div>
        </div>
      `;
  }
}

export default PaymentModal;
