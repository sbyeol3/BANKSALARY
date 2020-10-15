import store from '../../store/store';
import { setStatByDate, setStatByCategory } from '../../store/action';
import reducer from '../../store/reducer';
import request from '../../util/api';
import StatHeader from './header';

class Statistics {
  constructor(parentElement) {
    this.element = document.createElement('article');
    this.initializeElement();
    this.parentElement = parentElement;
    this.statHeader = new StatHeader(this.element);
    this.getStatByDates();
  }

  initializeElement() {
    this.element.id = 'statistics';
    this.element.classList.add('stat-section');
  }

  async getStatByDates() {
    const config = {
      uri: '/api/statistics/date',
      params: { year: 2020, month: store.account.month },
    };
    const { success, data: body } = await request(config);
    if (success) {
      const { data } = body;
      console.log(data);
      reducer(setStatByDate(data));
    }
  }

  async getStatByCategories() {
    const config = {
      uri: '/api/statistics/category',
      params: { year: 2020, month: store.account.month },
    };
    const { success, data } = await request(config);
    if (success) {
      console.log(data);
      reducer(setStatByCategory(data));
    }
  }

  getHTML() {}
  render() {
    this.statHeader.render();
    this.parentElement.insertAdjacentElement('beforeend', this.element);
  }
}

export default Statistics;
