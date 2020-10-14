import { getDay, convertFormatPrice } from '../util/util';

export default {
  details: (inner) => `
    <div id='details' class='breakdown'>
        ${inner}
    </div>`,
  totalSum: (data) => {
    const { incomings, outgoings } = data;
    return `
        <div id='total' class='total-sum'>
            <div class='select'>
                <input type='checkbox' name='incomings' class='checkbox in'>
                <label for='incomings' class='in text'>
                    <span class='sum-label'>수입</span>
                    <span id='in-sum' class='sum'>
                    ${convertFormatPrice(incomings)}원
                    </span>
                </label>
            </div>
            <div class='select'>
                <input type='checkbox' name='outgoings' class='checkbox out'>
                <label for='outgoings' class='out text'>
                    <span class='sum-label'>지출</span>
                    <span id='out-sum' class='sum'>
                    ${convertFormatPrice(outgoings)}원
                    </span>
                </label>
            </div>
        </div>
    `;
  },
  row: (rows) => `
        <div class='log-rows'>
            <div class='day-log'>
                ${rows}
            </div>
        </div>
    `,
  dayDesc: (data) => {
    const { date, total } = data;
    const day = getDay(date);
    return `
            <div class='day-desc'>
                <span class='date'>${date}</span>
                <span class='day'>${day}</span>
                <span class='in'>+${convertFormatPrice(total[1])}원</span>
                <span class='out'>-${convertFormatPrice(total[0])}원</span>
            </div>
        `;
  },
  logRow: (data) => {
    const { category, contents, payment, price, kind } = data;
    const sign = kind ? '+' : '-';
    return `
        <div class='log-row'>
            <span class='category'>${category}</span>
            <span class='contents'>${contents === 'null' ? '' : contents}</span>
            <span class='payment'>${kind === 1 ? '' : payment}</span>
            <span class='price'>${sign}${convertFormatPrice(price)}원</span>
        </div>
    `;
  },
};
