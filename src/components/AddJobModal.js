import AddIcon from '@mui/icons-material/Add'
import {
  Button,
  Card,
  Divider,
  Modal
} from '@mui/material'
import React, { useState } from 'react'
import AddJobForm from './AddJobForm'

const AddJobModal = ({ data, docNumber, type }) => {
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
        <AddIcon />
        Add Job
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
            Add jobs to {type}
          </h1>

          <Divider />

          <AddJobForm
            data={data}
            type={type}
            docNumber={docNumber}
            callback={handleClose}
          />
        </Card>
      </Modal>
    </span>
  )
}

export default AddJobModal

