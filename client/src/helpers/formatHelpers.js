const formatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formatNumber = (value) => {
  return formatter.format(value);
};

const formatDay = (day) => {
  if (day < 10) {
    let string = day.toString();
    return '0' + string;
  }
  return day;
};

const getCurrentPeriod = () => {
  const year = new Date().getFullYear().toString();
  const monthInt = new Date().getMonth() + 1;

  if (monthInt < 12) {
    return `${year.toString()}-0${monthInt.toString()}`;
  } else {
    return `${year.toString()}-${monthInt.toString()}`;
  }
}; //Done

export { formatDay, formatNumber, getCurrentPeriod };
