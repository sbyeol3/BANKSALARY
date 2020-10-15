import store from '../../store/store';
import $STAT from '../../elements/statistics';

const COLOR_NUM = $STAT.color.length;

class BarChart {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.element = document.createElement('div');
    this.element.classList.add('chart');
    this.element.classList.add('bar');
  }

  insertRow() {
    const categories = store.statistics.byCategory;
    const elements = categories.reduce((prev, data, idx) => {
      console.log(data);
      const color = $STAT.color[idx % COLOR_NUM];
      const html = $STAT.bar({ ...data, color });
      return prev + html;
    }, '');
    this.element.innerHTML = elements;
    console.log(elements);
    this.parentElement.insertAdjacentElement('beforeend', this.element);
  }

  removeBeforeRows() {
    [...this.element.childNodes].forEach((node) => {
      this.element.removeChild(node);
    });
  }

  render() {
    this.removeBeforeRows();
    this.insertRow();
  }
}

export default BarChart;
