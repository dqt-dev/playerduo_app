export const dateTimeToString = (date) => {
  return date.split('T')[0].substr('5') + ' ' + date.split('T')[1].substr(0, 5)

}