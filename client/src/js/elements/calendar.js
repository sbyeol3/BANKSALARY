import { convertFormatPrice } from '../util/util';

export default {
  index: `
        <div id='index' class='row index'>
            <span class='square sun'>일</span>
            <span class='square'>월</span>
            <span class='square'>화</span>
            <span class='square'>수</span>
            <span class='square'>목</span>
            <span class='square'>금</span>
            <span class='square'>토</span>
        </div>
    `,
  row: (squares) => {
    return `<div class='row'>${squares}</div>`;
  },
  square: (data) => {
    const { date: fullDate, incomings, outgoings } = data;
    const date = fullDate.split('-')[2];
    const day = new Date(fullDate).getDay();
    return `
    <span class='square ${day === 0 ? 'sun' : ''}'>
        <span class='date'>${date}</span>
        <span class='in'>+${convertFormatPrice(incomings)}</span>
        <span class='out'>-${convertFormatPrice(outgoings)}</span>
    </span>`;
  },
  empty: `
  <span class='square'>
      <span class='in'></span>
      <span class='out'></span>
  </span>`,
};
