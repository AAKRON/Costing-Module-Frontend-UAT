import {
  Button, Card, FormControl, InputLabel,
  MenuItem,
  Modal, Select, TextField
} from '@mui/material'
import { useState } from 'react'
import { useLogin, useNotify } from 'react-admin'

export default () => {
  const login = useLogin()
  const notify = useNotify()
  const [database, setDatabase] = useState('')
  const [openConfirm, setOpenConfirm] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const isAdmin = localStorage.getItem('role') === 'admin'

  const validatePassword = (password, callback) => {
    login({ username: localStorage.getItem('username'), password })
      .then(() => {
        callback()
        notify('Database updated successfully')
      })
      .catch(() => notify('Invalid email or password'))
  }

  const handleConfirmAuth = (e) => {
    e.preventDefault()

    const callback = () => {
      localStorage.setItem('db', database)
      setOpenConfirm(false)
      setDatabase('')
    }
  
    validatePassword(confirmPassword, callback)
  }

  return (
    <Card style={{ margin: '2rem', padding: '1rem' }}>
      {isAdmin
        ? (
          <div>
            <h2 style={{ margin: '0'}}>
              Current Database: {localStorage.getItem('db') || '2023'}
            </h2>

            <FormControl style={{ width: '100%', maxWidth: '500px'}}>
              <InputLabel
                id='titleDb'
              >
                Select Database
              </InputLabel>
              <Select
                labelId='titleDb'
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
              >
                <MenuItem value={'2020'}>2020</MenuItem>
                <MenuItem value={'2021'}>2021</MenuItem>
                <MenuItem value={'2022'}>2022</MenuItem>
                <MenuItem value={'2023'}>2023</MenuItem>
              </Select>

              {database !== '' && (
                <Button
                  variant='contained'
                  onClick={() => setOpenConfirm(true)}
                  style={{ marginTop: '1rem' }}
                >
                  Confirm Database
                </Button>
              )}

              <Modal
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Card style={{ padding: '1rem' }}>
                  <h3>
                    Confirm Authentication for Database: {database}
                  </h3>

                  <FormControl fullWidth>
                    <TextField
                      label='Password'
                      variant='outlined'
                      type='password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                      variant='contained'
                      onClick={handleConfirmAuth}
                      color='success'
                    >
                      Confirm
                    </Button>
                  </FormControl>
                </Card>
              </Modal>
            </FormControl>
          </div>
        )
        : (
        <h1 style={{ color: '#00bcd4', textAlign: 'center', fontSize: '1.7rem' }}>
          Hello {localStorage.getItem('username')}, You have only{' '}
          <b>Add & View</b> rights in full system
        </h1>
        )
      }
    </Card>
  )
}
