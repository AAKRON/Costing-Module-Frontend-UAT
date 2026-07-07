export const isAdmin = () => localStorage.getItem('role') === 'admin'

export const isModifyPermission = () => {
  return localStorage.getItem('yearFrozen') !== 'true'
}

export const getDate = ({
  day,
  month,
  year,
}) => {
  const now = new Date()
  const _day = day || now.getDate()
  const _month = month || now.getMonth() + 1
  const _year = year || now.getFullYear()

  return `${_year}-${_month < 10 ? `0${_month}` : _month}-${_day < 10 ? `0${_day}` : _day}`
}

export const Divider = (a, b) => {
  const divider = Number(a)
  const dividend = Number(b)

  if (isNaN(divider) || isNaN(dividend) || dividend === 0) {
    return 0
  }

  return (a / b).toFixed(4)
}

export const roundNumber = (num, decimalPlaces = 4) => {
  const number = Number(num)

  if (isNaN(number)) {
    return 0
  }

  return number.toFixed(decimalPlaces)
}
