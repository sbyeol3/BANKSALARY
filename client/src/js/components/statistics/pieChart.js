import store from '../../store/store';
import $STAT from '../../elements/statistics';

const COLOR_NUM = $STAT.color.length;

class PieChart {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.element = document.createElement('div');
    this.element.classList.add('chart');
  }

  initailzeChart() {
    this.canvas = document.createElement('canvas');
    this.element.insertAdjacentElement('beforeend', this.canvas);
    this.canvas.classList.add('canvas');
    this.canvas.width = 300;
    this.canvas.height = 300;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.context = this.canvas.getContext('2d');
  }

  drawChart() {
    const categories = store.statistics.byCategory;
    console.log(categories);
    categories.reduce((prev, data, idx) => {
      const { percent } = data;
      const angle = 3.6 * percent;
      console.log(prev, angle);
      this.context.fillStyle = $STAT.color[idx % COLOR_NUM];
      this.context.beginPath();
      this.context.moveTo(this.centerX, this.centerY);
      this.context.arc(
        this.centerX,
        this.centerY,
        this.centerY - 50,
        (prev * Math.PI) / 180,
        (angle * Math.PI) / 180,
        false
      );
      this.context.closePath();
      this.context.fill();
      return prev + percent;
    }, 0);
  }

  render() {
    console.log(store.statistics);
    this.initailzeChart();
    this.drawChart();
    this.parentElement.insertAdjacentElement('beforeend', this.element);
  }
}

export default PieChart;
