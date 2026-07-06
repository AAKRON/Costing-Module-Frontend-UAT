import {
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNotify, useRefresh } from 'react-admin'
import { SERVER_URL } from '../config/'

export default () => {
  const notify  = useNotify()
  const refresh = useRefresh()

  const [years,       setYears]       = useState([])
  const [loading,     setLoading]     = useState(true)
  const [openFreeze,  setOpenFreeze]  = useState(false)
  const [freezing,    setFreezing]    = useState(false)

  const currentYear      = localStorage.getItem('db')
  const currentEntry     = years.find(y => y.year === parseInt(currentYear))
  const currentFrozen    = currentEntry?.frozen === true

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Database: localStorage.getItem('db'),
  })

  const fetchYears = () => {
    setLoading(true)
    fetch(`${SERVER_URL}/year_management/years`, { headers: authHeaders() })
      .then(r => r.json())
      .then(data => { setYears(data.years || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchYears() }, [])

  const handleFreeze = () => {
    setFreezing(true)
    const nextYear = parseInt(currentYear) + 1
    fetch(`${SERVER_URL}/year_management/freeze_and_advance`, {
      method: 'POST',
      headers: { ...authHeaders(), Database: currentYear },
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
          notify(`Freeze failed: ${data.message || data.error || JSON.stringify(data)}`, { type: 'error' })
        }
      })
      .catch(err => { setFreezing(false); notify(`Error: ${err.message}`, { type: 'error' }) })
  }

  return (
    <Card style={{ margin: '2rem', padding: '1.5rem' }}>
      <h2 style={{ margin: '0 0 1.5rem' }}>Year Management</h2>

      {loading ? (
        <CircularProgress />
      ) : (
        <Table size='small' style={{ maxWidth: 400, marginBottom: '2rem' }}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Year</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {years.map(y => (
              <TableRow key={y.year} selected={String(y.year) === currentYear}>
                <TableCell>
                  {y.year}
                  {String(y.year) === currentYear && (
                    <span style={{ marginLeft: 8, fontSize: '0.75rem', color: '#666' }}>(active)</span>
                  )}
                </TableCell>
                <TableCell>
                  {y.frozen
                    ? <Chip label='Frozen' size='small' color='error' />
                    : <Chip label='Active' size='small' color='success' />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Divider style={{ marginBottom: '1.5rem' }} />

      {currentFrozen ? (
        <Typography color='error'>Year {currentYear} is frozen and read-only.</Typography>
      ) : (
        <div>
          <Typography variant='body2' style={{ marginBottom: '1rem' }}>
            Freezing <strong>{currentYear}</strong> will copy all data into a new{' '}
            <strong>{parseInt(currentYear) + 1}</strong> database and make{' '}
            <strong>{currentYear}</strong> read-only.
          </Typography>
          <Button
            variant='contained'
            color='error'
            onClick={() => setOpenFreeze(true)}
          >
            Freeze {currentYear} &amp; Create {parseInt(currentYear) + 1}
          </Button>
        </div>
      )}

      <Modal
        open={openFreeze}
        onClose={() => !freezing && setOpenFreeze(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card style={{ padding: '1.5rem', maxWidth: 440 }}>
          <h3 style={{ margin: '0 0 0.75rem' }}>Confirm: Freeze Year {currentYear}?</h3>
          <Typography variant='body2' style={{ marginBottom: '1.5rem' }}>
            All data from <strong>{currentYear}</strong> (including users) will be copied to{' '}
            <strong>{parseInt(currentYear) + 1}</strong>. Year <strong>{currentYear}</strong> becomes
            read-only permanently. You will be switched to {parseInt(currentYear) + 1} automatically.
          </Typography>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button
              variant='contained'
              color='error'
              onClick={handleFreeze}
              disabled={freezing}
              startIcon={freezing ? <CircularProgress size={16} color='inherit' /> : null}
            >
              {freezing ? 'Working…' : `Freeze ${currentYear} & Create ${parseInt(currentYear) + 1}`}
            </Button>
            <Button variant='outlined' onClick={() => setOpenFreeze(false)} disabled={freezing}>
              Cancel
            </Button>
          </div>
        </Card>
      </Modal>
    </Card>
  )
}
