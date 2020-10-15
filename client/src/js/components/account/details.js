import store from '../../store/store';
import reducer from '../../store/reducer';
import request from '../../util/api';
import { setLogData, setTotalSum } from '../../store/action';
import $DETAILS from '../../elements/details';

class Details {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.renderTotalSum();
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

  getSumHtml(detailsValue) {
    return $DETAILS.totalSum(store.details.total, detailsValue);
  }

  getDayLogsHtml(logs, detailsValue) {
    return logs.reduce((prev, log) => {
      const { kind } = log;
      if (detailsValue === kind) return prev;
      return prev + $DETAILS.logRow(log);
    }, '');
  }

  getHtml(detailsValue) {
    const { details } = store;
    const logRows = details.logs.reduce((prev, data) => {
      const [date, value] = data;
      const { total, logs } = value;
      const dayElement = $DETAILS.dayDesc({ date, total });
      const logsElement = this.getDayLogsHtml(logs, detailsValue);
      return prev + $DETAILS.row(dayElement + logsElement);
    }, '');
    return $DETAILS.details(logRows);
  }

  async render(detailsValue = 2) {
    await this.getTransactionLogs();
    this.renderTotalSum(detailsValue);
    this.parentElement.innerHTML += this.getHtml(detailsValue);
  }

  renderTotalSum(detailsValue) {
    this.parentElement.innerHTML += this.getSumHtml(detailsValue);
  }
}

export default Details;
