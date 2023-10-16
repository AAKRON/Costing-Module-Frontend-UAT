import { Card } from '@mui/material'
import { useLogin, useNotify } from 'react-admin'
import { FileUpload } from '../../components/FileUpload'
import { isAdmin } from '../../helpers/functions'

const Spreadsheet = () => {
  const login = useLogin()
  const notify = useNotify()
  
  const validatePassword = (password, callback) => {
    login({ username: localStorage.getItem('username'), password })
      .then(() => {
        callback()
        notify('Database updated successfully')
      })
      .catch(() => notify('Invalid email or password'))
  }

  return (
    <Card style={{ margin: '2rem', padding: '1rem' }}>
      {isAdmin() && <FileUpload validatePassword={validatePassword} />}

      {!isAdmin() && (
        <h1 style={{ color: '#00bcd4', textAlign: 'center', fontSize: '1.7rem' }}>
          Hello {localStorage.getItem('username')}, You have only{' '}
          <b>Add & View</b> rights in full system
        </h1>
      )}
    </Card>
  )
}

export default Spreadsheet