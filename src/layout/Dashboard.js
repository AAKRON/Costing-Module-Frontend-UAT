import {
  Button, Card,
  Divider,
  FormControl, InputLabel,
  MenuItem,
  Modal, Select, TextField,
} from '@mui/material'
import { useState } from 'react'
import { useNotify, useRefresh } from 'react-admin'
import { login } from '../actions/authActions'
import { isAdmin } from '../helpers/functions'
import Charts from './charts'

export default () => {
  const refresh = useRefresh()
  const notify = useNotify()
  const [database, setDatabase] = useState('')
  const [openConfirm, setOpenConfirm] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleConfirmAuth = (e) => {
    e.preventDefault()

    login({
      username: localStorage.getItem('username'),
      password: confirmPassword,
    })
      .then((res) => {
        if (res) {
          notify('Database Changed Successfully')
          localStorage.setItem('db', database)
          setOpenConfirm(false)
          setDatabase('')
          refresh()
        } else {
          notify('Incorrect username or password', 'error')
        }
      })
      .catch(() => {
        notify('Incorrect username or password', 'error')
      })
  }

  return (
    <Card style={{ margin: '2rem', padding: '1rem' }}>
      {isAdmin()
        ? (
          <div>
            <div>
              <h2 style={{ margin: '0'}}>
                Current Database: {localStorage.getItem('db')}
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

            <Divider style={{ margin: '2rem 0 1rem'}} />

            <div>
              <Charts />
            </div>
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
