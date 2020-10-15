import store from '../../store/store';
import $STAT from '../../elements/statistics';

const COLOR_NUM = $STAT.color.length;
const HALF_PIE = Math.PI / 180;

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
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.context = this.canvas.getContext('2d');
    this.context.font = '13px Gulim';
  }

  drawChart() {
    const categories = store.statistics.byCategory;
    console.log(categories);
    categories.reduce((prev, data, idx) => {
      const { title, percent } = data;
      const angle = prev + 3.6 * percent;

      // draw pie
      const color = $STAT.color[idx % COLOR_NUM];
      this.context.fillStyle = color;
      this.context.beginPath();
      this.context.moveTo(this.centerX, this.centerY);
      this.context.arc(
        this.centerX,
        this.centerY,
        this.centerY - 100,
        prev * HALF_PIE,
        angle * HALF_PIE,
        false
      );
      this.context.closePath();
      this.context.fill();

      // draw text
      const halfAngle = (prev + angle) / 2;
      const percentage = `${title} ${percent}%`;
      const textX =
        halfAngle > 60 && halfAngle < 240
          ? this.centerX - 100
          : this.centerX + 50;
      const textY =
        halfAngle > 140 && halfAngle < 320
          ? this.centerY + 10
          : this.centerY - 10;
      this.context.fillStyle = '#0B0C0C';
      this.context.fillText(
        percentage,
        textX + 70 * Math.cos(halfAngle * HALF_PIE),
        textY + 70 * Math.sin(halfAngle * HALF_PIE)
      );
      return angle;
    }, 0);
  }

  removeBeforeCharts() {
    [...this.element.childNodes].forEach((node) => {
      this.element.removeChild(node);
    });
  }

  render() {
    this.removeBeforeCharts();
    this.initailzeChart();
    this.drawChart();
    this.parentElement.insertAdjacentElement('beforeend', this.element);
  }
}

export default PieChart;
