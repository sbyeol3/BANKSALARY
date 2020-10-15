import store from '../../store/store';
import $STAT from '../../elements/statistics';

class StatHeader {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  getHTML() {
    return $STAT.header(store.statistics.total);
  }

  render() {
    this.parentElement.innerHTML += this.getHTML();
  }
}

export default StatHeader;
