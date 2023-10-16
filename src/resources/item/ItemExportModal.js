import FileFileDownload from '@mui/icons-material/FileDownload'
import {
  Autocomplete,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  TextField
} from '@mui/material'
import React from 'react'
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

class ItemExportModal extends React.Component {
  state = { open: false, items: [], seleted_items: [] }

  fetchItems = () =>
    restClient.getList('item-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })

  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false })

  handleItemPriceCostDownload = (e) => {
    e.preventDefault()
    window.open(`${SERVER_URL}/item-download/item-price-cost.csv`, '_blank')
  }

  handleItemInventoryCostDownload = (e) => {
    e.preventDefault()
    window.open(
      `${SERVER_URL}/item-download/item-inventory-cost.csv`,
      '_blank'
    )
  }

  handleSeletedItemPriceCostDownload = (e) => {
    e.preventDefault()

    const items = this.state.seleted_items.map((item) => {
      return stringHelpers.extractLeadingNumber(item)
    })

    window.open(
      `${SERVER_URL}/item-download/item-price-cost.csv?items=${items.toString()}`,
      '_blank'
    )
  }

  handleSeletedItemInventoryCostDownload = (e) => {
    e.preventDefault()

    const items = this.state.seleted_items.map((item) => {
      return stringHelpers.extractLeadingNumber(item)
    })
  
    window.open(
      `${SERVER_URL}/item-download/item-inventory-cost.csv?items=${items.toString()}`,
      '_blank'
    )
  }

  componentDidMount() {
    this.fetchItems().then(({ data }) => {
      const items = data.map(
        (item) => `${item.item_number} - ${item.description}`
      )

      function customCompare(a, b) {
        const numA = parseInt(a.split(' - ')[0])
        const numB = parseInt(b.split(' - ')[0])
        return numA - numB
      }

      items.sort(customCompare)
      this.setState({ items })
    })
  }

  render() {
    return (
      <span>
        <Button
          style={{ fontSize: '0.8rem' }}
          onClick={this.handleOpen}
        >
          <FileFileDownload  style={{ fontSize: '1rem' }}/>
          Export Items
        </Button>
  
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>
            Export Item List
          </DialogTitle>

          <Divider />

          <div style={styles.CenterAlgin}>
            <h2>Export All Items</h2>

            <Button
              variant='contained'
              color='error'
              style={styles.RaisedButton.FirstButton}
              onClick={this.handleItemPriceCostDownload}
            >
              <FileFileDownload />
              Price Cost Items
            </Button>

            <Button
              variant='contained'
              color='error'
              style={styles.RaisedButton.SecondButton}
              onClick={this.handleItemInventoryCostDownload}
            >
              <FileFileDownload />
              Inventory Cost Items
            </Button>
            <Divider />

            <h2 style={{ marginBottom: 0 }}>Export Selected Items</h2>
            <Autocomplete
              multiple
              options={this.state.items}
              value={this.state.seleted_items}
              onChange={(e, value) => {
                this.setState({ seleted_items: value })
              }}
              renderInput={(params) =>
                <TextField {...params} label='Type the item number' />
              }
            />

            {this.state.seleted_items.length > 0 && (
              <>
                <Button
                  variant='contained'
                  color='info'
                  style={styles.RaisedButton.FirstButton}
                  onClick={this.handleSeletedItemPriceCostDownload}
                >
                  <FileFileDownload />
                  Price Cost Items
                </Button>

                <Button
                  variant='contained'
                  color='info'
                  style={styles.RaisedButton.SecondButton}
                  onClick={this.handleSeletedItemInventoryCostDownload}
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
}

export { ItemExportModal }

