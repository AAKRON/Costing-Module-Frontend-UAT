import {
  Alert,
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
import { useNotify } from 'react-admin'
import { SERVER_URL } from '../config/'

export default () => {
  const notify = useNotify()

  const currentYear = localStorage.getItem('db')

  const [target,   setTarget]   = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [syncing,  setSyncing]  = useState(false)
  const [result,   setResult]   = useState(null)

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Database: localStorage.getItem('db'),
  })

  const fetchTarget = () => {
    setLoading(true)
    fetch(`${SERVER_URL}/finish_costing/erp_target`, { headers: authHeaders() })
      .then(r => r.json())
      .then(data => { setTarget(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchTarget() }, [])

  const handleSync = () => {
    setOpenConfirm(false)
    setSyncing(true)
    setResult(null)
    fetch(`${SERVER_URL}/finish_costing/push_to_erp`, {
      method: 'POST',
      headers: authHeaders(),
    })
      .then(r => r.json())
      .then(data => {
        setSyncing(false)
        setResult(data)
        if (data.status === 'done') {
          notify(`Sync sent: ${data.items_sent} item(s)`, { type: 'info' })
        } else {
          notify(`Sync error: ${data.error || data.erp_http_status || 'unknown error'}`, { type: 'error' })
        }
      })
      .catch(err => {
        setSyncing(false)
        setResult({ status: 'error', error: err.message })
        notify(`Error: ${err.message}`, { type: 'error' })
      })
  }

  const erpSummary = result?.erp_response
  const isProductionTarget = target?.erp_sync_url?.includes('arc1967.tiory.com')

  return (
    <Card style={{ margin: '2rem', padding: '1.5rem', maxWidth: 720 }}>
      <h2 style={{ margin: '0 0 0.5rem' }}>Finish Costing</h2>
      <Typography variant='body2' style={{ marginBottom: '1.5rem', opacity: 0.75 }}>
        Pushes this year's Standard item costs from Costing into Tiory (ERP). Only Quantity,
        Discount Code, and Cost are copied down into next-year Standard breaks - List, Net, and
        Margin are never touched. Blanks, International, and Special pricing are out of scope.
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Alert severity={isProductionTarget ? 'error' : 'warning'} style={{ marginBottom: '1.5rem' }}>
            {isProductionTarget ? 'LIVE production target:' : 'Test/clone target:'}{' '}
            <strong>{target?.erp_sync_url || 'not configured'}</strong>
            {target?.allowed_hosts && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.85em', opacity: 0.8 }}>
                Allowed hosts: {target.allowed_hosts.join(', ')}
              </div>
            )}
          </Alert>

          <Typography variant='body2' style={{ marginBottom: '1rem' }}>
            Costing year: <strong>{currentYear}</strong>
          </Typography>

          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpenConfirm(true)}
            disabled={syncing}
            startIcon={syncing ? <CircularProgress size={16} color='inherit' /> : null}
          >
            {syncing ? 'Syncing…' : 'Sync with Tiory'}
          </Button>
        </>
      )}

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <Divider style={{ marginBottom: '1rem' }} />
          <Typography variant='h6' style={{ marginBottom: '0.75rem' }}>Result</Typography>

          {result.status === 'done' ? (
            <>
              <Chip
                label={`${result.items_sent} item(s) sent`}
                color='primary'
                size='small'
                style={{ marginRight: '0.5rem' }}
              />
              {erpSummary && (
                <>
                  <Chip label={`Synced: ${erpSummary.synced_count}`} color='success' size='small' style={{ marginRight: '0.5rem' }} />
                  <Chip label={`Skipped: ${erpSummary.skipped_count}`} color='default' size='small' style={{ marginRight: '0.5rem' }} />
                  <Chip label={`Errors: ${erpSummary.error_count}`} color={erpSummary.error_count > 0 ? 'error' : 'default'} size='small' />
                </>
              )}

              {erpSummary?.skipped?.length > 0 && (
                <Table size='small' style={{ marginTop: '1rem' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Item</strong></TableCell>
                      <TableCell><strong>Skipped reason</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {erpSummary.skipped.map((s, i) => (
                      <TableRow key={i}>
                        <TableCell>{s.item_code}</TableCell>
                        <TableCell>{s.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {erpSummary?.errors?.length > 0 && (
                <Table size='small' style={{ marginTop: '1rem' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Item</strong></TableCell>
                      <TableCell><strong>Error</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {erpSummary.errors.map((e, i) => (
                      <TableRow key={i}>
                        <TableCell>{e.item_code}</TableCell>
                        <TableCell>{e.error}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </>
          ) : (
            <Alert severity='error'>
              {result.error || `ERP responded with status ${result.erp_http_status}`}
            </Alert>
          )}
        </div>
      )}

      <Modal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card style={{ padding: '1.5rem', maxWidth: 480 }}>
          <h3 style={{ margin: '0 0 0.75rem' }}>Confirm: Sync with Tiory?</h3>
          <Typography variant='body2' style={{ marginBottom: '1.5rem' }}>
            This pushes every current-year item's cost to <strong>{target?.erp_sync_url}</strong>,
            overwriting Quantity, Discount Code, and Cost on next-year Standard price breaks for
            each matching item. List, Net, and Margin are not affected.
          </Typography>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button variant='contained' color='primary' onClick={handleSync}>
              Sync with Tiory
            </Button>
            <Button variant='outlined' onClick={() => setOpenConfirm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      </Modal>
    </Card>
  )
}
