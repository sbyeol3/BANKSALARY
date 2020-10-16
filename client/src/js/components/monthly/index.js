import store from '../../store/store';
import request from '../../util/api';
import { setMonthly } from '../../store/action';
import reducer from '../../store/reducer';
import $MONTHLY from '../../elements/calendar';

const WEEKS = 6;
const DAYS = 7;

class Calendar {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.element = document.createElement('div');
    this.initializeCalendar();
  }

  initializeCalendar() {
    this.element.id = 'calendar';
    this.element.classList.add('calendar');
    const indexDays = $MONTHLY.index;
    this.element.innerHTML = indexDays;
  }

  async getCalendarData() {
    const { year, month } = store.account;
    const config = {
      uri: '/api/monthly',
      params: { year, month },
    };
    const { success, data: body } = await request(config);
    if (success) {
      const { data } = body;
      reducer(setMonthly(data));
    }
  }

  createCalendar() {
    const { year, month } = store.account;
    const { length, dates } = store.monthly;
    const firstDay = new Date(year, month - 1, 1).getDay();

    let day = 0;
    for (let i = 0; i < WEEKS; i++) {
      if (day === length) break;
      let innerOfRow = '';
      for (let j = 0; j < DAYS; j++) {
        const date = `${year}-${month}-${day + 1}`;
        if (day === length) break;
        else {
          if (i === 0 && day === 0 && firstDay !== j) {
            innerOfRow += $MONTHLY.empty;
          } else innerOfRow += $MONTHLY.square({ ...dates[day++], date });
        }
      }
      const row = $MONTHLY.row(innerOfRow);
      this.element.innerHTML += row;
    }
  }

  removeBeforeRows() {
    [...this.element.childNodes].forEach((node) => {
      if (node.id === 'index') return;
      this.element.removeChild(node);
    });
  }

  async render() {
    this.removeBeforeRows();
    await this.getCalendarData();
    this.createCalendar();
    this.parentElement.insertAdjacentElement('beforeend', this.element);
  }
}

export default Calendar;
