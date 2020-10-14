import store from '../store/store';
import reducer from '../store/reducer';
import request from '../util/api';
import { setLogData, setTotalSum } from '../store/action';
import $DETAILS from '../elements/details';

class Details {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.render();
  }

  async getTransactionLogs() {
    const config = {
      uri: '/api/log',
      method: 'GET',
      params: { year: 2020, month: store.account.month },
    };
    const { success, data: body } = await request(config);
    if (success) {
      const { data } = body;
      const { logs, sum } = data;
      reducer(setLogData(logs));
      reducer(setTotalSum(sum));
    }
  }

  getSumHtml() {
    return $DETAILS.totalSum(store.details.total);
  }

  getDayLogsHtml(logs) {
    return logs.reduce((prev, log) => {
      return prev + $DETAILS.logRow(log);
    }, '');
  }

  getHtml() {
    const { details } = store;
    const logRows = details.logs.reduce((prev, data) => {
      const [date, logs] = data;
      const dayElement = $DETAILS.dayDesc({ date });
      const logsElement = this.getDayLogsHtml(logs);
      return prev + $DETAILS.row(dayElement + logsElement);
    }, '');
    return $DETAILS.details(logRows);
  }

  async render() {
    await this.getTransactionLogs();
    this.renderTotalSum();
    this.parentElement.innerHTML += this.getHtml();
  }

  renderTotalSum() {
    this.parentElement.innerHTML += this.getSumHtml();
  }
}

export default Details;
