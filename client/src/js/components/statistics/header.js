import store from '../../store/store';
import reducer from '../../store/reducer';
import $STAT from '../../elements/statistics';

class StatHeader {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  getHTML() {
    return $STAT.header();
  }

  render() {
    this.parentElement.innerHTML += this.getHTML();
  }
}

export default StatHeader;
