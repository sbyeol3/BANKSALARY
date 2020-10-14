export const getDay = (date) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  return week[new Date(date).getDay()];
};

export const convertFormatPrice = (price) => {
  const reversedPrice = String(price).split('').reverse();
  return reversedPrice.reduce((prev, num, idx) => {
    if (idx !== 0 && idx % 3 === 0) return num + ',' + prev;
    return num + prev;
  }, '');
};
