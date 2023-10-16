export const isAdmin = () => localStorage.getItem('role') === 'admin'
export const isModifyPermission = () => {
  return new Date().getFullYear() === parseInt(localStorage.getItem('db'))
}