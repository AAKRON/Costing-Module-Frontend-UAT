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

class BlankExportModal extends React.Component {
  state = { open: false, blanks: [], seleted_blanks: [] }

  fetchBlanks = () => {
    return restClient.getList('blank-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })
  }

  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false })

  componentDidMount() {
    this.fetchBlanks().then(({ data }) => {
      const blanks = data.map(
        (blank) => `${blank.blank_number} - ${blank.description}`
      )
      // Función de comparación personalizada para ordenar por número
      function customCompare(a, b) {
        const numA = parseInt(a.split(' - ')[0])
        const numB = parseInt(b.split(' - ')[0])
        return numA - numB
      }

      blanks.sort(customCompare)
      // console.log(blanks)
      this.setState({ blanks })
    })
  }

  handleBlankPriceCostDownload = (e) => {
    e.preventDefault()
    window.open(`${SERVER_URL}/blank-download/blank-price-cost.csv`, '_blank')
  }

  handleBlankInventoryCostDownload = (e) => {
    e.preventDefault()
    window.open(
      `${SERVER_URL}/blank-download/blank-inventory-cost.csv`,
      '_blank'
    )
  }

  handleSeletedBlankPriceCostDownload = (e) => {
    e.preventDefault()

    const blanks = this.state.seleted_blanks.map((blank) => {
      return stringHelpers.extractLeadingNumber(blank)
    })
  
    window.open(
      `${SERVER_URL}/blank-download/blank-price-cost.csv?blanks=${blanks.toString()}`,
      '_blank'
    )
  }

  handleSeletedBlankInventoryCostDownload = (e) => {
    e.preventDefault()

    const blanks = this.state.seleted_blanks.map((blank) => {
      return stringHelpers.extractLeadingNumber(blank)
    })

    window.open(
      `${SERVER_URL}/blank-download/blank-inventory-cost.csv?blanks=${blanks.toString()}`,
      '_blank'
    )
  }

  render() {
    return (
      <span>
        <Button
          style={{ fontSize: '0.8rem' }}
          onClick={this.handleOpen}
        >
          <FileFileDownload  style={{ fontSize: '1rem' }}/>
          Export Blanks
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
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
              onClick={this.handleBlankPriceCostDownload}
            >
              <FileFileDownload />
              Price Cost Blanks
            </Button>

            <Button
              variant='contained'
              color='error'
              style={styles.RaisedButton.SecondButton}
              onClick={this.handleBlankInventoryCostDownload}
            >
              <FileFileDownload />
              Inventory Cost Blanks
            </Button>
            <Divider />

            <h2 style={{ marginBottom: 0 }}>Export Selected Blanks</h2>
            <Autocomplete
              multiple
              options={this.state.blanks}
              value={this.state.seleted_blanks}
              onChange={(e, value) => {
                this.setState({ seleted_blanks: value })
              }}
              renderInput={(params) =>
                <TextField {...params} label='Type the manufactured blank number' />
              }
            />

            {this.state.seleted_blanks.length > 0 && (
              <>
                <Button
                  variant='contained'
                  color='info'
                  style={styles.RaisedButton.FirstButton}
                  onClick={this.handleSeletedBlankPriceCostDownload}
                >
                  <FileFileDownload />
                  Price Cost Blanks
                </Button>

                <Button
                  variant='contained'
                  color='info'
                  style={styles.RaisedButton.SecondButton}
                  onClick={this.handleSeletedBlankInventoryCostDownload}
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
}

export { BlankExportModal }
