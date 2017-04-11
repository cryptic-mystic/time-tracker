
export function formatDigits(value, digits) {
  var str = value + ''

  if (str.length < digits) return `${Array(digits - str.length + 1).join('0')}${str}`
  else if (str.length > digits) return str.substring(0, digits)
  else return str
}

export function dateString(date) {
  if (date === null) return ''
  
  return `${date.getFullYear()}-${formatDigits(date.getMonth()+1, 2)}-${formatDigits(date.getDate(), 2)}`
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default {
  formatDigits,
  dateString,
  capitalize
}