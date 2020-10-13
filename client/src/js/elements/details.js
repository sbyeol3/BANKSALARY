export default {
  details: (inner) => `
    <div class='breakdown'>
        ${inner}
    </div>`,
  totalSum: (data) => {
    const { incomings, outgoings } = data;
    return `
        <div class='total-sum'>
            <div class='select'>
                <input type='checkbox' name='incomings' class='checkbox in'>
                <label for='incomings' class='in text'>
                    <span class='sum-label'>수입</span>
                    <span id='in-sum' class='sum'>${incomings}원</span>
                </label>
            </div>
            <div class='select'>
                <input type='checkbox' name='outgoings' class='checkbox out'>
                <label for='outgoings' class='out text'>
                    <span class='sum-label'>지출</span>
                    <span id='out-sum' class='sum'>${outgoings}원</span>
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
    const { date, incomings, outgoings } = data;
    return `
            <div class='day-desc'>
                <span class='date'>${date}</span>
                <span class='day'>화</span>
                <span class='in'>+${incomings}원</span>
                <span class='out'>-${outgoings}원</span>
            </div>
        `;
  },
  logRow: (data) => {
    const { category, contents, payment, price } = data;
    return `
            <div class='log-row'>
                <span class='category'>쇼핑/뷰티</span>
                <span class='contents'>${contents}</span>
                <span class='payment'>카카오페이</span>
                <span class='price'>-${price}원</span>
            </div>
        `;
  },
};
