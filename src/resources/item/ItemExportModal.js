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
  },
}

const ItemExportModal = () => {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])
  const [seleted_items, setSeletedItems] = useState([])

  const fetchItems = () =>
    restClient.getList('item-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleItemPriceCostDownload = (e) => {
    e.preventDefault()
    window.open(`${SERVER_URL}/item-download/item-price-cost.csv`, '_blank')
  }

  const handleItemInventoryCostDownload = (e) => {
    e.preventDefault()
    window.open(
      `${SERVER_URL}/item-download/item-inventory-cost.csv`,
      '_blank'
    )
  }

  const handleSeletedItemPriceCostDownload = (e) => {
    e.preventDefault()

    const items = seleted_items.map((item) => {
      return stringHelpers.extractLeadingNumber(item)
    })

    window.open(
      `${SERVER_URL}/item-download/item-price-cost.csv?items=${items.toString()}`,
      '_blank'
    )
  }

  const handleSeletedItemInventoryCostDownload = (e) => {
    e.preventDefault()

    const items = seleted_items.map((item) => {
      return stringHelpers.extractLeadingNumber(item)
    })
  
    window.open(
      `${SERVER_URL}/item-download/item-inventory-cost.csv?items=${items.toString()}`,
      '_blank'
    )
  }

  useEffect(() => {
    fetchItems().then(({ data }) => {
      const items = data.map(
        (item) => `${item.item_number} - ${item.description}`
      )

      function customCompare(a, b) {
        const numA = parseInt(a.split(' - ')[0])
        const numB = parseInt(b.split(' - ')[0])
        return numA - numB
      }

      items.sort(customCompare)
      setItems(items)
    }).catch((err) => {
      console.log('Error fetching items', err)
    })
  }, [])

  return (
    <span>
      <Button
        style={{ fontSize: '0.8rem' }}
        onClick={handleOpen}
      >
        <FileFileDownload  style={{ fontSize: '1rem' }}/>
        Export Items
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Export Item List
        </DialogTitle>

        <Divider />

        <div style={styles.bodyDialog}>
          <h2>Export All Items</h2>

          <Button
            variant='contained'
            color='error'
            style={styles.RaisedButton.FirstButton}
            onClick={handleItemPriceCostDownload}
          >
            <FileFileDownload />
            Price Cost Items
          </Button>

          <Button
            variant='contained'
            color='error'
            style={styles.RaisedButton.SecondButton}
            onClick={handleItemInventoryCostDownload}
          >
            <FileFileDownload />
            Inventory Cost Items
          </Button>
          <Divider />

          <h2 style={{ marginBottom: 0 }}>Export Selected Items</h2>
          <Autocomplete
            multiple
            options={items}
            value={seleted_items}
            onChange={(e, value) => {
              setSeletedItems(value)
            }}
            renderInput={(params) =>
              <TextField {...params} label='Type the item number' />
            }
          />

          {seleted_items.length > 0 && (
            <>
              <Button
                variant='contained'
                color='info'
                style={styles.RaisedButton.FirstButton}
                onClick={handleSeletedItemPriceCostDownload}
              >
                <FileFileDownload />
                Price Cost Items
              </Button>

              <Button
                variant='contained'
                color='info'
                style={styles.RaisedButton.SecondButton}
                onClick={handleSeletedItemInventoryCostDownload}
              >
                <FileFileDownload />
                Inventory Cost Items
              </Button>
            </>
          )}
        </div>
      </Dialog>
    </span>
  )
}

export default ItemExportModal

