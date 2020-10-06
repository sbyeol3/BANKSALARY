const fs = require('fs');

const pad = (num) => {
  num = num + '';
  return num.length < 2 ? '0' + num : num;
};

const convertFormat = (date) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${pad(m)}-${pad(d)}`;
};

const getRandomDate = () => {
  const MONTHAGO = new Date('2020-09-10').getTime();
  const NOW = new Date().getTime();
  const date = new Date(MONTHAGO + Math.random() * (NOW - MONTHAGO));
  return convertFormat(date);
};

const createRow = (i) => {
  const contentsArray = [null, '메모', '돈을 아껴쓰자'];
  const kind = i % 25 === 0 ? 1 : 0;
  const price = (Math.floor(Math.random() * 999) + 1) * 100;
  const contents = contentsArray[i % 3];
  const logDate = getRandomDate();
  const userId = 2;
  const random = Math.floor(Math.random() * 5);
  const payment = !kind ? 30000 + random : null;
  return { kind, price, contents, logDate, userId, payment };
};

const createRows = () => {
  return Array(100)
    .fill(0)
    .reduce((prev, curr, idx) => {
      const row = createRow(idx);
      const { kind, price, contents, logDate, userId, payment } = row;
      const string = `${idx},${kind},${price},${contents},${logDate},${userId},${payment}`;
      return prev + string + '\r\n';
    }, '');
};

const writeFile = () => {
  const data = createRows();
  fs.writeFileSync('./bulkLog.csv', data, (e) => {
    console.log(e);
  });
};

writeFile();
