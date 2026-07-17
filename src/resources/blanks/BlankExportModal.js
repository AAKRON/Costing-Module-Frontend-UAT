import FileFileDownload from '@mui/icons-material/FileDownload'
import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { SERVER_URL } from '../../config'

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

const BlankExportModal = () => (
  <Button
    style={{ fontSize: '0.8rem' }}
    onClick={() => downloadWithAuth(`${SERVER_URL}/blank-download/blanks-full.csv`, 'blanks-full.csv')}
  >
    <FileFileDownload style={{ fontSize: '1rem' }} />
    Export Blanks
  </Button>
)

export default BlankExportModal
