import CopyIcon from '@mui/icons-material/ContentCopy'
import {
  Button,
  Card,
  Divider,
  Modal,
} from '@mui/material'
import React, { useState } from 'react'
import CopyBlankForm from './CopyBlankForm'

const CopyBlankModal = ({ data, docNumber }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpen = () => setOpenDialog(true)
  const handleClose = () => setOpenDialog(false)

  return (
    <span>
      <Button
        onClick={handleOpen}
        sx={{ fontSize: '0.7rem' }}
      >
        <CopyIcon style={{ fontSize: '1.2rem' }} />
        Copy Blanks
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
        <Card style={{ width: '100%', maxWidth: '800px', margin: '1rem' }}>
          <h1 style={{ padding: '1rem', fontSize: '1.3rem' }}>
            Copy blanks to item
          </h1>

          <Divider />

          <CopyBlankForm
            data={data}
            docNumber={docNumber}
            callback={handleClose}
          />
        </Card>
      </Modal>
    </span>
  )
}

export default CopyBlankModal
