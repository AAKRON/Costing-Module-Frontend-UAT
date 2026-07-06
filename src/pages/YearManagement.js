import {
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  LinearProgress,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNotify } from 'react-admin'
import { SERVER_URL } from '../config/'

function AccessChip({ isActive }) {
  if (isActive) return <Chip label='Read / Write' size='small' color='success' />
  return             <Chip label='Read Only'     size='small' color='default' variant='outlined' />
}

export default () => {
  const notify = useNotify()

  const [years,       setYears]       = useState([])
  const [loading,     setLoading]     = useState(true)
  const [openFreeze,  setOpenFreeze]  = useState(false)
  const [freezing,    setFreezing]    = useState(false)
  const [rollingBack, setRollingBack] = useState(false)

  const currentYear       = localStorage.getItem('db')
  const currentEntry      = years.find(y => y.year === parseInt(currentYear))
  const currentFrozen     = currentEntry?.frozen === true
  const latestYear        = years.length ? Math.max(...years.map(y => y.year)) : null
  const isLatestYear      = latestYear !== null && parseInt(currentYear) === latestYear
  const secondLatestYear  = years.length > 1 ? Math.max(...years.filter(y => y.year !== latestYear).map(y => y.year)) : null
  const secondLatestEntry = secondLatestYear ? years.find(y => y.year === secondLatestYear) : null
  const canRollback       = secondLatestEntry?.frozen === true

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
    setOpenFreeze(false)
    const nextYear = parseInt(currentYear) + 1
    fetch(`${SERVER_URL}/year_management/freeze_and_advance`, {
      method: 'POST',
      headers: authHeaders(),
    })
      .then(r => r.json())
      .then(data => {
        if (data.status === 'success') {
          localStorage.setItem('db', String(nextYear))
          localStorage.setItem('yearFrozen', 'false')
          window.location.href = '/'
        } else {
          setFreezing(false)
          notify(`Freeze failed: ${data.message || data.error || JSON.stringify(data)}`, { type: 'error' })
        }
      })
      .catch(err => { setFreezing(false); notify(`Error: ${err.message}`, { type: 'error' }) })
  }

  const handleRollback = () => {
    if (!window.confirm(`Roll back ${latestYear}? This will drop the ${latestYear} database and restore ${secondLatestYear} to read/write.`)) return
    setRollingBack(true)
    fetch(`${SERVER_URL}/year_management/rollback_freeze`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        year_to_unfreeze:  secondLatestYear,
        next_year_to_drop: latestYear,
      }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.status === 'rolled_back') {
          localStorage.setItem('db', String(secondLatestYear))
          localStorage.setItem('yearFrozen', 'false')
          window.location.href = '/'
        } else {
          setRollingBack(false)
          notify(`Rollback failed: ${JSON.stringify(data)}`, { type: 'error' })
        }
      })
      .catch(err => { setRollingBack(false); notify(`Error: ${err.message}`, { type: 'error' }) })
  }

  return (
    <>
      {freezing && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.75)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: '#fff',
        }}>
          <Typography variant='h5' style={{ marginBottom: '1.5rem' }}>
            Creating {parseInt(currentYear) + 1}…
          </Typography>
          <Typography variant='body2' style={{ marginBottom: '1rem', opacity: 0.8 }}>
            Copying all data from {currentYear}. Do not close this window.
          </Typography>
          <div style={{ width: 360 }}>
            <LinearProgress color='inherit' />
          </div>
        </div>
      )}

      <Card style={{ margin: '2rem', padding: '1.5rem' }}>
        <h2 style={{ margin: '0 0 1.5rem' }}>Year Management</h2>

        {loading ? (
          <CircularProgress />
        ) : (
          <Table size='small' style={{ maxWidth: 480, marginBottom: '2rem' }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>Year</strong></TableCell>
                <TableCell><strong>Access</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {years.map(y => {
                const isActive = String(y.year) === currentYear
                return (
                  <TableRow key={y.year} selected={isActive}>
                    <TableCell>
                      <strong>{y.year}</strong>
                      {isActive && (
                        <Chip label='Active' size='small' color='primary' style={{ marginLeft: 8 }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <AccessChip isActive={isActive} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}

        <Divider style={{ marginBottom: '1.5rem' }} />

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {isLatestYear && !currentFrozen && (
            <div>
              <Typography variant='body2' style={{ marginBottom: '0.75rem' }}>
                Freeze <strong>{currentYear}</strong> and create <strong>{parseInt(currentYear) + 1}</strong>.
                All data will be copied. <strong>{currentYear}</strong> becomes read-only.
              </Typography>
              <Button variant='contained' color='error' onClick={() => setOpenFreeze(true)} disabled={freezing}>
                Freeze {currentYear} &amp; Create {parseInt(currentYear) + 1}
              </Button>
            </div>
          )}

          {canRollback && (
            <div>
              <Typography variant='body2' style={{ marginBottom: '0.75rem' }}>
                Roll back: drop <strong>{latestYear}</strong> and restore <strong>{secondLatestYear}</strong> to read/write.
              </Typography>
              <Button
                variant='outlined'
                color='warning'
                onClick={handleRollback}
                disabled={rollingBack}
                startIcon={rollingBack ? <CircularProgress size={16} /> : null}
              >
                {rollingBack ? 'Rolling back…' : `Roll Back ${latestYear}`}
              </Button>
            </div>
          )}
        </div>

        <Modal
          open={openFreeze}
          onClose={() => setOpenFreeze(false)}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Card style={{ padding: '1.5rem', maxWidth: 440 }}>
            <h3 style={{ margin: '0 0 0.75rem' }}>Confirm: Freeze Year {currentYear}?</h3>
            <Typography variant='body2' style={{ marginBottom: '1.5rem' }}>
              All data from <strong>{currentYear}</strong> (including users) will be copied to{' '}
              <strong>{parseInt(currentYear) + 1}</strong>. Year <strong>{currentYear}</strong> becomes
              read-only permanently. The system will be locked during the copy.
            </Typography>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button variant='contained' color='error' onClick={handleFreeze}>
                Freeze {currentYear} &amp; Create {parseInt(currentYear) + 1}
              </Button>
              <Button variant='outlined' onClick={() => setOpenFreeze(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        </Modal>
      </Card>
    </>
  )
}
