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
  bodyDialog: {
    textAlign: 'center',
    padding: '0 2rem 2rem',
    minWidth: '500px',
  },
}

const ColorExportModal = () => {
  const [open, setOpen] = useState(false)
  const [blanks, setBlanks] = useState([])
  const [seleted_blanks, setSeletedBlanks] = useState([])

  const fetchRawMaterials = () =>
    restClient.getList('color-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleItemPriceCostDownload = (e) => {
    e.preventDefault()
    window.open(`${SERVER_URL}/color-download/listing-color.csv`, '_blank')
  }

  const handleItemInventoryCostDownload = (e) => {
    e.preventDefault()
    window.open(`${SERVER_URL}/color-download/listing-color.csv`, '_blank')
  }

  const handleSeletedBlankPriceCostDownload = (e) => {
    e.preventDefault()

    const blanks = seleted_blanks.map((blank) => {
      return stringHelpers.extractLeadingNumber(blank)
    })

    window.open(
      `${SERVER_URL}/color-download/listing-color.csv?blanks=${blanks.toString()}`,
      '_blank'
    )
  }

  const handleSeletedBlankInventoryCostDownload = (e) => {
    e.preventDefault()

    const blanks = seleted_blanks.map((blank) => {
      return stringHelpers.extractLeadingNumber(blank)
    })

    window.open(
      `${SERVER_URL}/color-download/listing-color.csv?blanks=${blanks.toString()}`,
      '_blank'
    )
  }

  useEffect(() => {
    fetchRawMaterials().then(({ data }) => {
      const blanks = data.map(
        (raw) => `${raw.id} - ${raw.name}`
      )

      function customCompare(a, b) {
        const numA = parseInt(a.split(' - ')[0])
        const numB = parseInt(b.split(' - ')[0])
        return numA - numB
      }

      blanks.sort(customCompare)
      setBlanks(blanks)
    }).catch((err) => {
      console.log('Error fetching raw materials', err)
    })
  }, [])
  
  return (
    <span>
      <Button
        style={{ fontSize: '0.8rem' }}
        onClick={handleOpen}
      >
        <FileFileDownload  style={{ fontSize: '1rem' }}/>
        Export Color
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Export Color List
        </DialogTitle>

        <Divider />

        <div style={styles.bodyDialog}>
          <h2>Export All Colors</h2>

          <Button
            variant='contained'
            color='error'
            style={styles.RaisedButton.FirstButton}
            onClick={handleItemPriceCostDownload}
          >
            <FileFileDownload />
            Export Color Listing
          </Button>

          {/* <Button
            variant='contained'
            color='error'
            style={styles.RaisedButton.SecondButton}
            onClick={handleItemInventoryCostDownload}
          >
            <FileFileDownload />
            Inventory Cost Blanks
          </Button> */}
          <Divider />

          <h2 style={{ marginBottom: 0 }}>Export Selected Colors</h2>
          <Autocomplete
            multiple
            options={blanks}
            value={seleted_blanks}
            onChange={(e, value) => {
              setSeletedBlanks(value)
            }}
            renderInput={(params) =>
              <TextField {...params} label='Type the color name' />
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
                Export Selected Colors
              </Button>

              {/* <Button
                variant='contained'
                color='info'
                style={styles.RaisedButton.SecondButton}
                onClick={handleSeletedBlankInventoryCostDownload}
              >
                <FileFileDownload />
                Inventory Cost Blanks
              </Button> */}
            </>
          )}
        </div>
      </Dialog>
    </span>
  )
}

export default ColorExportModal

