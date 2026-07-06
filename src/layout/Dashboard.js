import {
  Button,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNotify, useRefresh } from 'react-admin'
import { login } from '../actions/authActions'
import { SERVER_URL } from '../config/'
import { isAdmin } from '../helpers/functions'
import Charts from './charts'

export default () => {
  const refresh = useRefresh()
  const notify  = useNotify()

  const [database,        setDatabase]        = useState('')
  const [openConfirm,     setOpenConfirm]     = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [years,           setYears]           = useState([])
  const [loadingYears,    setLoadingYears]    = useState(true)

  useEffect(() => {
    if (!isAdmin()) return
    fetch(`${SERVER_URL}/year_management/years`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Database: localStorage.getItem('db'),
      },
    })
      .then(r => r.json())
      .then(data => {
        const list = data.years || []
        setYears(list)
        setLoadingYears(false)
        // Sync frozen status for current db
        const currentDb = localStorage.getItem('db')
        const current = list.find(y => String(y.year) === currentDb)
        if (current) localStorage.setItem('yearFrozen', String(current.frozen))
      })
      .catch(() => setLoadingYears(false))
  }, [])

  const handleConfirmAuth = (e) => {
    e.preventDefault()
    login({ username: localStorage.getItem('username'), password: confirmPassword })
      .then((res) => {
        if (res) {
          const selected = years.find(y => String(y.year) === database)
          localStorage.setItem('db', database)
          localStorage.setItem('yearFrozen', String(selected?.frozen ?? false))
          notify('Database Changed Successfully')
          setOpenConfirm(false)
          setDatabase('')
          setConfirmPassword('')
          refresh()
        } else {
          notify('Incorrect username or password', { type: 'error' })
        }
      })
      .catch(() => notify('Incorrect username or password', { type: 'error' }))
  }

  return (
    <Card style={{ margin: '2rem', padding: '1rem' }}>
      {isAdmin() ? (
        <div>
          <div>
            <h2 style={{ margin: '0' }}>
              Current Database: {localStorage.getItem('db')}
            </h2>

            <FormControl style={{ width: '100%', maxWidth: '500px', marginTop: '1rem' }}>
              <InputLabel id='titleDb'>Select Database</InputLabel>
              {loadingYears ? (
                <CircularProgress size={24} style={{ margin: '1rem 0' }} />
              ) : (
                <Select
                  labelId='titleDb'
                  label='Select Database'
                  value={database}
                  onChange={e => setDatabase(e.target.value)}
                >
                  {years.map(y => (
                    <MenuItem key={y.year} value={String(y.year)}>
                      {y.year}{y.frozen ? ' — read only' : ''}
                    </MenuItem>
                  ))}
                </Select>
              )}

              {database !== '' && (
                <Button
                  variant='contained'
                  onClick={() => setOpenConfirm(true)}
                  style={{ marginTop: '1rem' }}
                >
                  Confirm Database
                </Button>
              )}
            </FormControl>
          </div>

          <Modal
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Card style={{ padding: '1rem', minWidth: '320px' }}>
              <h3>Confirm Authentication for Database: {database}</h3>
              <FormControl fullWidth>
                <TextField
                  label='Password'
                  variant='outlined'
                  type='password'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleConfirmAuth(e)}
                />
                <Button
                  variant='contained'
                  onClick={handleConfirmAuth}
                  color='success'
                  style={{ marginTop: '0.5rem' }}
                >
                  Confirm
                </Button>
              </FormControl>
            </Card>
          </Modal>

          <Divider style={{ margin: '2rem 0 1rem' }} />
          <Charts />
        </div>
      ) : (
        <h1 style={{ color: '#00bcd4', textAlign: 'center', fontSize: '1.7rem' }}>
          Hello {localStorage.getItem('username')}, You have only{' '}
          <b>Add &amp; View</b> rights in full system
        </h1>
      )}
    </Card>
  )
}
