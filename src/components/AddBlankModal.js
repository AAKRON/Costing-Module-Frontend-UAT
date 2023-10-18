import AddIcon from '@mui/icons-material/Add'
import {
  Button,
  Card,
  Divider,
  Modal
} from '@mui/material'
import React, { useState } from 'react'
import AddBlankForm from './AddBlankForm'

const AddBlankModal = ({ data, docNumber }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpen = () => setOpenDialog(true)
  const handleClose = () => setOpenDialog(false)

  return (
    <span>
      <Button
        onClick={handleOpen}
        sx={{
          fontSize: '0.7rem',
        }}
      >
        <AddIcon style={{ fontSize: '1rem' }} />
        Add Blank
      </Button>
  
      <Modal
        open={openDialog}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card style={{ width: '100%', maxWidth: '800px' }}>
          <h1
            style={{ padding: '1rem', fontSize: '1.3rem' }}
          >
            Add blanks to item
          </h1>

          <Divider />

          <AddBlankForm
            data={data}
            docNumber={docNumber}
            callback={handleClose}
          />
        </Card>
      </Modal>
    </span>
  )
}

export default AddBlankModal