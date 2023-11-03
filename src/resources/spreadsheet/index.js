import { Card } from '@mui/material'
import FileUpload from '../../components/FileUpload'
import { isAdmin } from '../../helpers/functions'

const Spreadsheet = () => {
  return (
    <Card style={{ margin: '2rem', padding: '1rem' }}>
      {isAdmin() && <FileUpload />}

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