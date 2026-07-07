import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FileDownload from '@mui/icons-material/FileDownload'
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  Modal,
  Paper,
  Table,
  TableBody,
  TableRow,
  TextField
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNotify } from 'react-admin'
import { SERVER_URL } from '../config'
import { stringHelpers } from '../helpers/stringHelpers'
import { setAuthorizationToken } from '../actions/authActions'
import restClient from '../providers/restClient'

const downloadPath = `${SERVER_URL}/cost-pdf-download`;

const style = {
  width: '100%',
  textAlign: 'center',
  display: 'inline-block',
}
const textCenterAlign = {
  textAlign: 'center',
  textOverflow: 'inherit'
}
const textLeftAlign = {
  textAlign: 'left',
  textOverflow: 'inherit',
  padding: '0.5rem'
}
const textRightAlign = {
  textAlign: 'right',
  textOverflow: 'inherit',
  padding: '0.5rem'
}
const rightColumnBorder = {
  borderRight: '1px solid #ccc',
  textOverflow: 'inherit'
}
const topBorder = {
  borderTop: '1px solid #ccc',
  textOverflow: 'inherit'
}
const bottomBorder = {
  borderBottom: '1px solid #ccc',
  textOverflow: 'inherit'
}

const BlankField = ({ blank, blankIndex, editBlank, deleteBlank }) => (
  <TableRow style={topBorder}>
    <td colSpan={6} style={textLeftAlign}>
      {blank.id !== undefined ? `${blank.id} - ${blank.name}` : blank.name}
    </td>
    <td style={textRightAlign}>${blank.cost}</td>
    <td>
      <Button
        onClick={() => editBlank(blank, blankIndex)}
      >
        <EditIcon/>
      </Button>
      <Button
        onClick={() => deleteBlank(blankIndex)}
      >
        <DeleteIcon/>
      </Button>
    </td>
    <td style={textRightAlign}> <b>${blank.cost}</b></td>
  </TableRow>
)

const JobField = ({ job, jobIndex, editJob, deleteJob }) => (
  <TableRow style={topBorder}>
    <td colSpan={3} style={textLeftAlign}>{job.job_listing_id} - {job.description}</td>
    <td style={textRightAlign}>${job.wages_per_hour || 0}</td>
    <td style={textCenterAlign}>{job.hour_per_piece || 0 }</td>
    <td style={textRightAlign}>{job.direct_labor_cost || 0}</td>
    <td style={textRightAlign}>{job.overhead_pricing_cost || 0}</td>
    <td>
      <Button
        onClick={() => editJob(job, jobIndex)}
      >
        <EditIcon/>
      </Button>
      <Button
        onClick={() => deleteJob(jobIndex)}
      >
        <DeleteIcon/>
      </Button>
    </td>
    <td style={textRightAlign}> <b>${job.total_pricing_cost}</b></td>
  </TableRow>
)

const AddCostCalculator = () => {
  const notify = useNotify()
  const [itemName, setItemName] = useState('')
  const [blanks, setBlanks] = useState([])
  const [jobs, setJobs] = useState([])
  const [screens, setScreens] = useState([])
  const [box, setBox] = useState({})
  const [inkCost, setInkCost] = useState(0)
  
  const [blanksList, setBlanksList] = useState({
    loading: true,
    data: []
  })
  const [jobsList, setJobsList] = useState({
    loading: true,
    data: []
  })
  const [boxesList, setBoxesList] = useState({
    loading: true,
    data: []
  })

  const [modalBlank, setModalBlank] = useState({
    open: false,
    data: null,
    index: -1,
  })
  const [modalJob, setModalJob] = useState({
    open: false,
    data: null,
    index: -1,
  })

  const fetchBlanks = () => 
    restClient.getList('blank-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })

  const fetchJobs = () =>
    restClient.getList('job-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })

  const fetchBoxes = () =>
    restClient.getList('box-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })

  const addBlank = () => setModalBlank({ open: true, data: null, index: -1 })
  const editBlank = (blank, blankIndex) => setModalBlank({ open: true, data: blank, index: blankIndex })
  const deleteBlank = (blankIndex) => setBlanks([...blanks.slice(0, blankIndex), ...blanks.slice(blankIndex + 1)])

  const handleSaveBlank = () => {
    if(!modalBlank.data?.name || modalBlank.data?.cost === undefined || modalBlank.data?.cost <= 0){
      return notify('Please fill all the fields')
    }

    if(modalBlank.index > -1){
      setBlanks([
        ...blanks.slice(0, modalBlank.index),
        modalBlank.data,
        ...blanks.slice(modalBlank.index + 1)
      ])
    }else{
      setBlanks([...blanks, modalBlank.data])
    }
  
    setModalBlank({ open: false, data: null, edit: -1 })
  }

  const addJob = () => setModalJob({ open: true, data: null, index: -1 })
  const editJob = (job, jobIndex) => {
    setModalJob({ open: true, data: job, index: jobIndex })
  }
  const deleteJob = (jobIndex) => {
    const newJobs = [...jobs]
    newJobs.splice(jobIndex, 1)

    const screens = newJobs
    .filter((job) => job.screen !== null)
    .map((job) => job)

    setScreens(screens)
    setJobs(newJobs)
  }

  const handleSaveJob = () => {
    if(modalJob?.data?.job_listing_id === undefined || modalJob?.data?.hour_per_piece === undefined || modalJob?.data?.hour_per_piece <= 0){
      return notify('Please fill all the fields')
    }

    restClient.update('job-cost-calculate', {
      id: modalJob.data.job_listing_id,
      data: modalJob.data,
    }).then(({ data }) => {
      let newJobs = [...jobs]

      if(modalJob.index > -1){
        newJobs[modalJob.index] = data
      }else{
        newJobs.push(data)
      }

      const screens = newJobs
        .filter((job) => job.screen !== null)
        .map((job) => job)

      setScreens(screens)
      setJobs(newJobs)
      setModalJob({ open: false, data: null, edit: -1 })
    }).catch((err) => {
      notify('Error saving job')
      console.log('Error saving job', err)
    })
  }

  const getTotalCost = () => {
    const blanksCost = blanks.reduce((acc, blank) => acc + blank.cost, 0)
    const jobsCost = jobs.reduce((acc, job) => acc + job.total_pricing_cost, 0)
    const screes = screens.reduce((acc, screen) => acc + screen.screen.cost, 0)
    const boxCost = box?.cost || 0
    const ink = inkCost || 0

    const sum = blanksCost + jobsCost + screes + boxCost + ink
    return sum.toFixed(5)
  }

  const handleDownloadInvoice = () => {
    if(!itemName){
      return notify('Please fill the item name')
    }

    if(blanks.length === 0){
      return notify('Please add at least one blank')
    }

    if(jobs.length === 0){
      return notify('Please add at least one job')
    }

    if(!box?.name){
      return notify('Please enter a box name')
    }

    if(!box?.cost){
      return notify('Please add the box cost')
    }
  
    if(!inkCost){
      return notify('Please add the ink cost')
    }

    const transformedBlanks = blanks.map((blank) => {
      return {
        name: blank.id !== undefined ? `${blank.id} - ${blank.name}` : blank.name,
        cost: blank.cost,
      }
    })

    const transformedBox = {
      name: box.id !== undefined ? `${box.id} - ${box.name}` : box.name,
      cost: box.cost,
    }

    const data = {
      item_name: itemName,
      blanks: transformedBlanks,
      selected_jobs: jobs,
      screens,
      box: [transformedBox],
      ink_cost: inkCost,
      total_cost: getTotalCost(),
    }

    setAuthorizationToken(downloadPath, {
      method: 'POST',
      body: JSON.stringify({ data }),
    }).then(() => {
      const token = localStorage.getItem('token')
      const db = localStorage.getItem('db')
      return fetch(`${SERVER_URL}/download/item_cost_invoice`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Database': db || '',
        },
      })
    }).then(response => {
      if (!response.ok) throw new Error(`Download failed: ${response.status}`)
      return response.blob()
    }).then(blob => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'item-cost-invoice.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }).catch((err) => {
      console.log('Error downloading invoice', err)
      notify('Error downloading invoice')
    })
  }

  useEffect(() => {
    fetchBlanks().then(({ data }) => {
      setBlanksList({ loading: false, data })
    }).catch((err) => console.log('Error fetching blanks', err))

    fetchJobs().then(({ data }) => {
      setJobsList({ loading: false, data })
    }).catch((err) => console.log('Error fetching jobs', err))

    fetchBoxes().then(({ data }) => {
      setBoxesList({ loading: false, data })
    }).catch((err) => console.log('Error fetching boxes', err))
  }, [])

  return (
    <div>
      <TextField
        style={{ margin: '40px 0' }}
        label='Item Name'
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <Paper style={style}>
        <Table>
          <thead>
            <TableRow>
              <th style={textLeftAlign} colSpan={9}>
                <b>Cost Factor</b>
              </th>
              <th style={textRightAlign}>
                <b>Cost($)</b>
              </th>
            </TableRow>
          </thead>

          <TableBody>
            <TableRow style={topBorder}>
              <td style={rightColumnBorder} rowSpan={blanks.length + 2}>
                Blanks
              </td>
              <td colSpan={6} style={textLeftAlign}>
                Blank
              </td>
              <td style={textRightAlign}>
                Pricing Cost($)
              </td>
              <td></td>
            </TableRow>

            {blanks.map((blank, index) => (
              <BlankField
                key={index}
                blank={blank}
                blankIndex={index}
                editBlank={editBlank}
                deleteBlank={deleteBlank}
              />
            ))}

            <TableRow style={topBorder}>
              <td colSpan={9} style={textLeftAlign}>
                <Button
                  color='error'
                  onClick={addBlank}
                >
                  <AddIcon />
                  Add Blank
                </Button>
              </td>
            </TableRow>


            <TableRow style={topBorder}>
              <td style={rightColumnBorder} rowSpan={jobs.length + 2}>
              Jobs
              </td>
              <td colSpan={3} style={textLeftAlign}>
                Job#
              </td>
              <td style={textRightAlign}>
                Wages($)/hr
              </td>
              <td style={textRightAlign}>
                Hr/pcs
              </td>
              <td style={textRightAlign}>
                Direct Labor ($)
              </td>
              <td style={textRightAlign}>
                Pricing ($)
              </td>
              <td></td>
            </TableRow>

            {jobs.map((job, index) => (
              <JobField
                key={index}
                job={job}
                jobIndex={index}
                editJob={editJob}
                deleteJob={deleteJob}
              />
            ))}

            <TableRow style={topBorder}>
              <td colSpan={9} style={textLeftAlign}>
                <Button
                  color='error'
                  onClick={addJob}
                >
                  <AddIcon />
                  Add Job
                </Button>
              </td>
            </TableRow>


            {screens.length > 0 && (
              <>
                <TableRow style={topBorder}>
                  <td
                    rowSpan={screens.length + 1}
                    style={rightColumnBorder}
                  >
                    Screens
                  </td>
                  <td colSpan={6} style={textLeftAlign}>Job</td>
                  <td colSpan={2} style={textCenterAlign}>
                    Screen Name
                  </td>
                </TableRow>

                {screens.map((screen, index) => (
                  <TableRow key={index} style={topBorder}>
                    <td colSpan={6} style={textLeftAlign}>
                      {screen.job_number} - {screen.description}
                    </td>
                    <td colSpan={2} style={textCenterAlign}>
                      {screen.screen.screen_size}
                    </td>
                    <td style={textRightAlign}>
                      <b>${screen.screen.cost}</b>
                    </td>
                  </TableRow>
                ))}
              </>
            )}


            <TableRow style={topBorder}>
              <td rowSpan={2} style={rightColumnBorder}>
                Box
              </td>
              <td colSpan={6} style={textLeftAlign}>Name</td>
              <td colSpan={2} style={textCenterAlign}>
                Cost($)
              </td>
            </TableRow>
  
            <TableRow style={topBorder}>
              <td colSpan={6}>
                <Autocomplete
                  freeSolo
                  options={boxesList.data.map((box) => `${box.id} - ${box.name}`)}
                  value={box?.id !== undefined ? `${box.id} - ${box.name}` : (box?.name || '')}
                  onChange={(event, newValue) => {
                    if (!newValue) {
                      setBox({ ...box, id: undefined, name: '' })
                      return
                    }
                    const id = stringHelpers.extractLeadingNumber(newValue)
                    if (isNaN(id)) {
                      setBox({ ...box, id: undefined, name: newValue })
                    } else {
                      const name = stringHelpers.extractStringAfterDash(newValue)
                      setBox({ ...box, id, name })
                    }
                  }}
                  onInputChange={(event, newInputValue, reason) => {
                    if (reason === 'input') {
                      const id = stringHelpers.extractLeadingNumber(newInputValue)
                      if (isNaN(id)) {
                        setBox({ ...box, id: undefined, name: newInputValue })
                      }
                    }
                  }}
                  renderInput={(params) =>
                    <TextField {...params} label='Box Name' />
                  }
                />
              </td>
              <td colSpan={2} style={textCenterAlign}>
                <TextField
                  label='Box Cost'
                  type='number'
                  value={box?.cost}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                  onChange={(e) => setBox({ ...box, cost: Number(e.target.value) })}
                />
              </td>
              <td style={textRightAlign}>
                <b>${box.cost || 0}</b>
              </td>
            </TableRow>

            <TableRow style={topBorder}>
              <td style={rightColumnBorder}>
                Ink Cost
              </td>
              <td colSpan={2} style={textCenterAlign}>
                <TextField
                  label='Ink Cost'
                  value={inkCost}
                  type='number'
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                  onChange={(e) => setInkCost(Number(e.target.value))}
                />
              </td>
              <td colSpan={7} style={textRightAlign}>
                <b>${inkCost || 0}</b>
              </td>
            </TableRow>


            <TableRow
              style={{
                ...topBorder,
                ...bottomBorder,
              }}
            >
              <td colSpan={9} style={textRightAlign}>
                <b>Total Price Cost($)</b>
              </td>
              <td style={textRightAlign}>
                <b>${getTotalCost()}</b>
              </td>
            </TableRow>
          </TableBody>
        </Table>

        <Button
          variant='contained'
          onClick={handleDownloadInvoice}
          style={{
            margin: '10px 24px',
            position: 'relative',
            float: 'right',
          }}
        >
          <FileDownload />
          Download Invoice
        </Button>
      </Paper>

      <Modal
        open={modalBlank.open}
        onClose={() => setModalBlank({ open: false, data: null, edit: -1 })}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card style={{ width: '100%', maxWidth: '800px', margin: '1rem' }}>
          <h1
            style={{ padding: '1rem', fontSize: '1.3rem' }}
          >
            {modalBlank.edit > -1 ? 'Edit' : 'Add'} Blank
          </h1>

          <Divider />

          <Box
            style={{
              padding : '1rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}
          >
            <Autocomplete
              freeSolo
              loading={blanksList.loading}
              options={blanksList.data
                .filter((blank) => !blanks.find((b) => b.id === blank.id))
                .map((blank) => `${blank.id} - ${blank.description}`)
              }
              value={modalBlank.data?.id !== undefined
                ? `${modalBlank.data?.id} - ${modalBlank.data?.name}`
                : (modalBlank.data?.name || '')}
              onChange={(event, newValue) => {
                if (!newValue) {
                  setModalBlank({ ...modalBlank, data: { ...modalBlank.data, id: undefined, name: '' } })
                  return
                }
                const id = stringHelpers.extractLeadingNumber(newValue)
                if (isNaN(id)) {
                  setModalBlank({ ...modalBlank, data: { ...modalBlank.data, id: undefined, name: newValue } })
                } else {
                  const name = stringHelpers.extractStringAfterDash(newValue)
                  setModalBlank({ ...modalBlank, data: { ...modalBlank.data, id, name } })
                }
              }}
              onInputChange={(event, newInputValue, reason) => {
                if (reason === 'input') {
                  const id = stringHelpers.extractLeadingNumber(newInputValue)
                  if (isNaN(id)) {
                    setModalBlank({ ...modalBlank, data: { ...modalBlank.data, id: undefined, name: newInputValue } })
                  }
                }
              }}
              renderInput={(params) =>
                <TextField {...params} label='Blank Name' />
              }
            />

            <TextField
              label='Cost'
              type='number'
              value={modalBlank.data?.cost}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
              onChange={(e) => {
                setModalBlank({ ...modalBlank, data: { ...modalBlank.data, cost: Number(e.target.value) } })
              }}
            />
          </Box>

          <Button
            style={{ margin: '0 1rem 1rem' }}
            variant='contained'
            onClick={handleSaveBlank}
          >
            Save
          </Button>
        </Card>
      </Modal>

      <Modal
        open={modalJob.open}
        onClose={() => setModalJob({ open: false, data: null, edit: false })}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card style={{ width: '100%', maxWidth: '800px', margin: '1rem' }}>
          <h1
            style={{ padding: '1rem', fontSize: '1.3rem' }}
          >
            {modalJob.index > -1 ? 'Edit' : 'Add'} Job
          </h1>

          <Divider />

          <Box
            style={{
              padding : '1rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}
          >
            <Autocomplete
              loading={jobsList.loading}
              options={jobsList.data
                .filter((job) => !jobs.find((b) => b.job_listing_id === job.job_number))
                .map((job) => `${job.job_number} - ${job.description}`)
              }
              value={modalJob.data?.job_number !== undefined ? `${modalJob.data?.job_number} - ${modalJob.data?.description}` : ''}
              onChange={(event, newValue) => {
                const job_listing_id = stringHelpers.extractLeadingNumber(newValue)
                const description = stringHelpers.extractStringAfterDash(newValue)
                setModalJob({ ...modalJob, data: {
                  ...modalJob.data,
                  job_listing_id,
                  job_number: job_listing_id,
                  description,
                }})
              }}
              renderInput={(params) =>
                <TextField {...params} label='Type the job number' />
              }
            />

            <TextField
              label='Hour Per Piece'
              type='number'
              value={modalJob.data?.hour_per_piece}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
              onChange={(e) =>
                setModalJob({ ...modalJob, data: { ...modalJob.data, hour_per_piece: Number(e.target.value) } })
              }
            />
          </Box>

          <Button
            style={{ margin: '0 1rem 1rem' }}
            variant='contained'
            onClick={handleSaveJob}
          >
            Save
          </Button>
        </Card>
      </Modal>
    </div>
  )
}

export default AddCostCalculator
