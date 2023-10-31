import FileFileDownload from '@mui/icons-material/FileDownload'
import {
  Autocomplete,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  TextField
} from '@mui/material'
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
    window.open(`${SERVER_URL}/blank-download/blank-price-cost.csv`, '_blank')
  }

  const handleBlankInventoryCostDownload = (e) => {
    e.preventDefault()
    window.open(
      `${SERVER_URL}/blank-download/blank-inventory-cost.csv`,
      '_blank'
    )
  }

  const handleSeletedBlankPriceCostDownload = (e) => {
    e.preventDefault()

    const blanks = seleted_blanks.map((blank) => {
      return stringHelpers.extractLeadingNumber(blank)
    })
  
    window.open(
      `${SERVER_URL}/blank-download/blank-price-cost.csv?blanks=${blanks.toString()}`,
      '_blank'
    )
  }

  const handleSeletedBlankInventoryCostDownload = (e) => {
    e.preventDefault()

    const blanks = seleted_blanks.map((blank) => {
      return stringHelpers.extractLeadingNumber(blank)
    })

    window.open(
      `${SERVER_URL}/blank-download/blank-inventory-cost.csv?blanks=${blanks.toString()}`,
      '_blank'
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
