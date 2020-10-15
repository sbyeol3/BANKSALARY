import { convertFormatPrice } from '../util/util';

export default {
  header: (price) => {
    return `
        <div id='stat-header' class='stat-header'>
            <input type='radio' name='stat' value='category-stat' class='radio' checked>
            <label for='stat' class='label'>카테고리별 지출</label>
            <input type='radio' name='stat' value='date-stat' class='radio'>
            <label for='stat' class='label'>일별 지출</label>
            <span class='text'>이번 달 지출 금액</span>
            <span class='total'>${convertFormatPrice(price) || 0}원</span>
        </div>
    `;
  },
  color: [
    '#05F7A7',
    '#04C584',
    '#03AB73',
    '#038559',
    '#039162',
    '#026B48',
    '#01452E',
  ],
  bar: (data) => {
    const { title, percent, sum, color } = data;
    return `
    <div class='bar-row'>
      <span class='category'>${title}</span>
      <span class='percent'>${percent}%</span>
      <div class='bar'  style='width:${
        percent * 2.5
      }px;background-color:${color}'></div>
      <span class='price'>${convertFormatPrice(sum)}원</span>
    </div>`;
  },
};
