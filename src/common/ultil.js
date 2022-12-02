import ls from 'localstorage-slim';

export const handleConvertDate = (date) => {
  return date.split('T')[0].substr('5') + ' ' + date.split('T')[1].substr(0, 5)

}
export const formatNumberWithComma = (input) => {
  return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
ls.config.encrypt = true;
ls.config.secret = 85;

export  {ls}
