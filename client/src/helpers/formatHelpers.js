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

export { formatDay, formatNumber };
