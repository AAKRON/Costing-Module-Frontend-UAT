import FileFileDownload from '@mui/icons-material/FileDownload'
import {
  Autocomplete,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  TextField
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config'
import { stringHelpers } from '../../helpers/stringHelpers'
import restClient from '../../providers/restClient'

const styles = {
  RaisedButton: {
    FirstButton: {
      marginTop: '30px',
      marginBottom: '10px',
    },
    SecondButton: {
      marginLeft: '30px',
      marginTop: '30px',
      marginBottom: '10px',
    },
  },
  CenterAlgin: {
    textAlign: 'center',
    padding: '0 2rem 2rem',
  },
}

const downloadWithAuth = (url, filename) => {
  const token = localStorage.getItem('token')
  const db = localStorage.getItem('db')
  const headers = {
    Authorization: `Bearer ${token}`,
    ...(db ? { Database: db } : {}),
  }
  axios.get(url, { responseType: 'blob', headers }).then((response) => {
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = blobUrl
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(blobUrl)
  }).catch((err) => {
    console.error('Download failed', err)
  })
}

const BlankExportModal = () => {
  const [open, setOpen] = useState(false)
  const [blanks, setBlanks] = useState([])
  const [seleted_blanks, setSeletedBlanks] = useState([])

  const fetchBlanks = () => 
    restClient.getList('blank-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleBlankPriceCostDownload = (e) => {
    e.preventDefault()
    downloadWithAuth(`${SERVER_URL}/blank-download/blank-price-cost.csv`, 'blank-price-cost.csv')
  }

  const handleBlankInventoryCostDownload = (e) => {
    e.preventDefault()
    downloadWithAuth(`${SERVER_URL}/blank-download/blank-inventory-cost.csv`, 'blank-inventory-cost.csv')
  }

  const handleSeletedBlankPriceCostDownload = (e) => {
    e.preventDefault()

    const blanks = seleted_blanks.map((blank) => {
      return stringHelpers.extractLeadingNumber(blank)
    })
  
    downloadWithAuth(
      `${SERVER_URL}/blank-download/blank-price-cost.csv?blanks=${blanks.toString()}`,
      'blank-price-cost.csv'
    )
  }

  const handleSeletedBlankInventoryCostDownload = (e) => {
    e.preventDefault()

    const blanks = seleted_blanks.map((blank) => {
      return stringHelpers.extractLeadingNumber(blank)
    })

    downloadWithAuth(
      `${SERVER_URL}/blank-download/blank-inventory-cost.csv?blanks=${blanks.toString()}`,
      'blank-inventory-cost.csv'
    )
  }

  useEffect(() => {
    fetchBlanks().then(({ data }) => {
      const blanks = data.map(
        (blank) => `${blank?.blank_number} - ${blank?.description}`
      )

      function customCompare(a, b) {
        const numA = parseInt(a.split(' - ')[0])
        const numB = parseInt(b.split(' - ')[0])
        return numA - numB
      }

      blanks.sort(customCompare)
      setBlanks(blanks)
    }).catch((err) => {
      console.log('Error fetching blanks', err)
    })
  }, [])


  return (
    <span>
      <Button
        style={{ fontSize: '0.8rem' }}
        onClick={handleOpen}
      >
        <FileFileDownload  style={{ fontSize: '1rem' }}/>
        Export Blanks
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Export Manufactured Blank List
        </DialogTitle>

        <Divider />

        <div style={styles.CenterAlgin}>
          <h2>Export All Blanks</h2>
          <Button
            variant='contained'
            color='error'
            style={styles.RaisedButton.FirstButton}
            onClick={handleBlankPriceCostDownload}
          >
            <FileFileDownload />
            Price Cost Blanks
          </Button>

          <Button
            variant='contained'
            color='error'
            style={styles.RaisedButton.SecondButton}
            onClick={handleBlankInventoryCostDownload}
          >
            <FileFileDownload />
            Inventory Cost Blanks
          </Button>
          <Divider />

          <h2 style={{ marginBottom: 0 }}>Export Selected Blanks</h2>
          <Autocomplete
            multiple
            options={blanks}
            value={seleted_blanks}
            onChange={(e, value) => {
              setSeletedBlanks(value)
            }}
            renderInput={(params) =>
              <TextField {...params} label='Type the manufactured blank number' />
            }
          />

          {seleted_blanks.length > 0 && (
            <>
              <Button
                variant='contained'
                color='info'
                style={styles.RaisedButton.FirstButton}
                onClick={handleSeletedBlankPriceCostDownload}
              >
                <FileFileDownload />
                Price Cost Blanks
              </Button>

              <Button
                variant='contained'
                color='info'
                style={styles.RaisedButton.SecondButton}
                onClick={handleSeletedBlankInventoryCostDownload}
              >
                <FileFileDownload />
                Inventory Cost Blanks
              </Button>
            </>
          )}
        </div>
      </Dialog>
    </span>
  )
}

export default BlankExportModal
