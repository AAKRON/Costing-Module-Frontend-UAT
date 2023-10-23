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
  bodyDialog: {
    textAlign: 'center',
    padding: '0 2rem 2rem',
    minWidth: '500px',
  },
}

class RawMaterialTypeExportModal extends React.Component {
  state = { open: false, blanks: [], seleted_blanks: [] }

  fetchRawMaterials = () =>
    restClient.getList('raw-material-type-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })

  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false })

  handleBlankPriceCostDownload = (e) => {
    e.preventDefault()
    window.open(
      `${SERVER_URL}/raw-material-type-download/listing-raw-material.csv`,
      '_blank'
    )
  }

  handleBlankInventoryCostDownload = (e) => {
    e.preventDefault()
    window.open(
      `${SERVER_URL}/raw-material-type-download/listing-raw-material.csv`,
      '_blank'
    )
  }

  handleSeletedBlankPriceCostDownload = (e) => {
    e.preventDefault()

    const blanks = this.state.seleted_blanks.map((blank) => {
      return stringHelpers.extractLeadingNumber(blank)
    })

    window.open(
      `${SERVER_URL}/raw-material-type-download/listing-raw-material.csv?blanks=${blanks.toString()}`,
      '_blank'
    )
  }

  handleSeletedBlankInventoryCostDownload = (e) => {
    e.preventDefault()

    const blanks = this.state.seleted_blanks.map((blank) => {
      return stringHelpers.extractLeadingNumber(blank)
    })

    window.open(
      `${SERVER_URL}/raw-material-type-download/listing-raw-material.csv?blanks=${blanks.toString()}`,
      '_blank'
    )
  }

  componentDidMount() {
    this.fetchRawMaterials().then(({ data }) => {
      const blanks = data.map(
        (raw) => `${raw.id} - ${raw.name}`
      )

      function customCompare(a, b) {
        const numA = parseInt(a.split(' - ')[0])
        const numB = parseInt(b.split(' - ')[0])
        return numA - numB
      }

      blanks.sort(customCompare)
      this.setState({ blanks })
    }).catch((err) => {
      console.log('Error fetching raw materials', err)
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
          Export Raw Material Types
        </Button>
  
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>
            Export Raw Material Types List
          </DialogTitle>

          <Divider />

          <div style={styles.bodyDialog}>
            <h2>Export All Raw Material Types</h2>

            <Button
              variant='contained'
              color='error'
              style={styles.RaisedButton.FirstButton}
              onClick={this.handleBlankPriceCostDownload}
            >
              <FileFileDownload />
              Raw Material Listing
            </Button>

            {/* <Button
              variant='contained'
              color='error'
              style={styles.RaisedButton.SecondButton}
              onClick={this.handleBlankInventoryCostDownload}
            >
              <FileFileDownload />
              Inventory Cost Blanks
            </Button> */}
            <Divider />

            <h2 style={{ marginBottom: 0 }}>Export Selected Raw Material Types</h2>
            <Autocomplete
              multiple
              options={this.state.blanks}
              value={this.state.seleted_blanks}
              onChange={(e, value) => {
                this.setState({ seleted_blanks: value })
              }}
              renderInput={(params) =>
                <TextField {...params} label='Type the Raw Material Type name' />
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
                  Export Selected Raw Materials Types
                </Button>

                {/* <Button
                  variant='contained'
                  color='info'
                  style={styles.RaisedButton.SecondButton}
                  onClick={this.handleSeletedBlankInventoryCostDownload}
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
}

export { RawMaterialTypeExportModal }
