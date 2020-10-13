import store from '../store/store';
import { setTabValue } from '../store/action';
import reducer from '../store/reducer';
import $TAB from '../elements/tab';

const tabValue = {
  breakdown: 0,
  monthly: 1,
  statistics: 2,
};

class Tab {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.render();
    this.state = store.account;
    this.elements = document.getElementsByClassName('each-tab');
  }

  changeSelectedTab(tabVal) {
    [...this.elements].map((element) => {
      const { name } = element.dataset;
      if (tabValue[name] === tabVal) element.classList.add('selected');
      else element.classList.remove('selected');
    });
  }

  getHtml() {
    return $TAB.tab;
  }

  render() {}
}

export default Tab;
