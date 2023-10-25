export const isAdmin = () => localStorage.getItem('role') === 'admin'

export const isModifyPermission = () => {
  return new Date().getFullYear() === parseInt(localStorage.getItem('db'))
}

export const getDate = ({
  day
}) => {
  const now = new Date()
  const date = day || now.getDate()
  const month = now.getMonth() + 1
  const year = now.getFullYear()

  return `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`
}