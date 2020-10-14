export default {
  month: (month) => {
    return `
    <span id='month' class='month-section'>
      <button id='month-before' class='month-btn'>◀︎</button>
      <span id='month-val' class='text'>${month}월</span>
      <button id='month-after' class='month-btn'>▶︎</button>
    </span>
  `;
  },
  tab: `
    <div id='tab' class='tab-section'>
        <span class='each-tab selected' data-name='breakdown'>내역</span>
        <span class='each-tab' data-name='monthly'>달력</span>
        <span class='each-tab' data-name='statistics'>통계</span>
    </div>
    `,
};
