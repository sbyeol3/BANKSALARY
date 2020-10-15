import store from '../../store/store';
import { setStatByDate, setStatByCategory } from '../../store/action';
import reducer from '../../store/reducer';
import request from '../../util/api';
import StatHeader from './header';
import PieChart from './pieChart';

const headerValue = {
  date: 0,
  category: 1,
};

class Statistics {
  constructor(parentElement) {
    this.element = document.createElement('div');
    this.parentElement = parentElement;
    this.statHeader = new StatHeader(this.element);
    this.header = headerValue.category;
    this.pie = new PieChart(this.element);
    this.initializeEvent();
    this.initializeElement();
    this.getStatByDates();
    this.getStatByCategories();
  }

  initializeEvent() {
    this.element.addEventListener('change', (e) => this.onChangeStatValue(e));
  }

  initializeElement() {
    this.element.id = 'statistics';
    this.element.classList.add('stat-section');
  }

  onChangeStatValue(e) {
    const { target } = e;
    const { name } = target;
    if (name === 'date-stat') {
      this.header = headerValue.date;
    } else if (name === 'category-stat') {
      this.header = headerValue.category;
    }
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
    const { success, data: body } = await request(config);
    if (success) {
      const { data } = body;
      console.log(data);
      reducer(setStatByCategory(data));
    }
  }

  removeChildNodes() {
    [...this.element.childNodes].forEach((node) => {
      this.element.removeChild(node);
    });
  }

  render() {
    this.removeChildNodes();
    this.statHeader.render();
    this.parentElement.insertAdjacentElement('beforeend', this.element);
    if (this.header === headerValue.category) {
      this.pie.render();
    }
  }
}

export default Statistics;
