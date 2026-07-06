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
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNotify, useRefresh } from 'react-admin'
import { login } from '../actions/authActions'
import { SERVER_URL } from '../config/'
import { isAdmin } from '../helpers/functions'
import Charts from './charts'

export default () => {
  const refresh  = useRefresh()
  const notify   = useNotify()

  const [database,         setDatabase]         = useState('')
  const [openConfirm,      setOpenConfirm]      = useState(false)
  const [confirmPassword,  setConfirmPassword]  = useState('')

  const [years,            setYears]            = useState([])
  const [loadingYears,     setLoadingYears]     = useState(true)
  const [openFreeze,       setOpenFreeze]       = useState(false)
  const [freezing,         setFreezing]         = useState(false)

  const currentYear = localStorage.getItem('db')
  const currentYearEntry = years.find(y => y.year === parseInt(currentYear))
  const currentYearFrozen = currentYearEntry?.frozen === true

  const apiBase = SERVER_URL // e.g. https://...railway.app/api/v1

  useEffect(() => {
    if (isAdmin()) fetchYears()
  }, [])

  const fetchYears = () => {
    setLoadingYears(true)
    fetch(`${apiBase}/year_management/years`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Database: localStorage.getItem('db'),
      },
    })
      .then(r => r.json())
      .then(data => {
        setYears(data.years || [])
        setLoadingYears(false)
      })
      .catch(() => setLoadingYears(false))
  }

  const handleConfirmAuth = (e) => {
    e.preventDefault()
    login({ username: localStorage.getItem('username'), password: confirmPassword })
      .then((res) => {
        if (res) {
          notify('Database Changed Successfully')
          localStorage.setItem('db', database)
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

  const handleFreeze = () => {
    setFreezing(true)
    const nextYear = parseInt(currentYear) + 1
    fetch(`${apiBase}/year_management/freeze_and_advance`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Database: currentYear,
      },
    })
      .then(r => r.json())
      .then(data => {
        setFreezing(false)
        setOpenFreeze(false)
        if (data.status === 'success') {
          notify(`Year ${currentYear} frozen. Switched to ${nextYear}.`)
          localStorage.setItem('db', String(nextYear))
          fetchYears()
          refresh()
        } else {
          const msg = data.message || data.error || JSON.stringify(data)
          notify(`Freeze failed: ${msg}`, { type: 'error' })
        }
      })
      .catch(err => {
        setFreezing(false)
        notify(`Error: ${err.message}`, { type: 'error' })
      })
  }

  return (
    <Card style={{ margin: '2rem', padding: '1rem' }}>
      {isAdmin() ? (
        <div>
          <div>
            <h2 style={{ margin: '0' }}>
              Current Database: {currentYear}
              {currentYearFrozen && (
                <span style={{ marginLeft: '1rem', color: '#e53935', fontSize: '0.85rem', fontWeight: 'normal' }}>
                  (Read-Only)
                </span>
              )}
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
                      {y.year}{y.frozen ? ' — frozen' : ''}
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

            {!currentYearFrozen && (
              <div style={{ marginTop: '1.5rem' }}>
                <Button
                  variant='outlined'
                  color='warning'
                  onClick={() => setOpenFreeze(true)}
                >
                  Freeze {currentYear} &amp; Create {parseInt(currentYear) + 1}
                </Button>
              </div>
            )}
          </div>

          {/* Switch database modal */}
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

          {/* Freeze year modal */}
          <Modal
            open={openFreeze}
            onClose={() => !freezing && setOpenFreeze(false)}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Card style={{ padding: '1.5rem', maxWidth: '440px' }}>
              <h3 style={{ margin: '0 0 0.75rem' }}>Freeze Year {currentYear}?</h3>
              <Typography variant='body2' style={{ marginBottom: '1.5rem' }}>
                This will copy all {currentYear} data (including users) into a new{' '}
                <strong>{parseInt(currentYear) + 1}</strong> database, then make{' '}
                <strong>{currentYear}</strong> read-only. You will be switched to{' '}
                {parseInt(currentYear) + 1} automatically. This cannot be undone.
              </Typography>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button
                  variant='contained'
                  color='error'
                  onClick={handleFreeze}
                  disabled={freezing}
                  startIcon={freezing ? <CircularProgress size={16} color='inherit' /> : null}
                >
                  {freezing
                    ? 'Working…'
                    : `Freeze ${currentYear} & Create ${parseInt(currentYear) + 1}`}
                </Button>
                <Button
                  variant='outlined'
                  onClick={() => setOpenFreeze(false)}
                  disabled={freezing}
                >
                  Cancel
                </Button>
              </div>
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
