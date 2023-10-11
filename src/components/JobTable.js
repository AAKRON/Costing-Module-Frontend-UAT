import ContentCreate from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import {
  Autocomplete,
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableRow,
  TextField,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import restClient from '../providers/restClient'

const JobTable = ({ jobsInitial, onUpdate, resource, number }) => {
  const [itemsJobs, setItemsJobs] = useState([])
  const [items, setItems] = useState([])
  const [jobs, setJobs] = useState([])
  const [jobEdit, setJobEdit] = useState({})
  const [overheadCost, setOverheadCost] = useState('pricing')
  const [openModal, setOpenModal] = useState(false)
  const [style, setStyle] = useState({
    inventory: { display: 'none', },
    pricing: { display: '' },
  })

  const fetchItems = () => {
    return restClient.getList('item-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })
  }

  const fetchJobs = () => {
    return restClient.getList('job-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })
  }

  const handleRemoveJob = (job) => {
    const currentItemJobs = itemsJobs.map((j) => {
      if(j.job_pk_id === job.job_pk_id){
        return {
          ...j,
          deleted: true
        }
      }else{
        return j
      }
    })
  
    setItemsJobs(currentItemJobs)
    onUpdate(currentItemJobs)
  }

  const handleEditJob = async() => {
    if(resource === 'blank_jobs'){
      const response = await axios.put(
        'https://costing-module-api-heroku-20.herokuapp.com/api/v1/update-blank-job-data',
        {
          blank_number: number,
          job_listing_id: jobEdit.job_listing_id,
          hour_per_piece: jobEdit.hour_per_piece,
          blank_job_id: jobEdit.job_pk_id,
        },
        {
          headers: {
            Authorization: `Bearer 6539a1e806bbc2c09436b39c62615425`,
          },
        }
      )

      const newItemsJobs = itemsJobs.map((j) => {
        const jobUpdated = response.data.find((job) => job.id === j.job_pk_id)

        if(!jobUpdated){
          return j
        }

        const job = jobs.find((job) => {
          const jobNumber = job.split(' - ')[0]
          return Number(jobNumber) === jobUpdated.job_listing_id
        })

        if(!job){
          return j
        }

        return {
          ...j,
          hour_per_piece: jobUpdated.hour_per_piece,
          job_listing_id: jobUpdated.job_listing_id,
          job_number: jobUpdated.job_listing_id,
          description: job.split(' - ')[1],
        }
      })

      setItemsJobs(newItemsJobs)
      onUpdate(newItemsJobs)
    }

    if(resource === 'item_jobs'){
      // FALTA REVISAR
      const response = await axios.put(
        'https://costing-module-api-heroku-20.herokuapp.com/api/v1/update-item-job-data',
        {
          blank_number: number,
          job_listing_id: jobEdit.job_listing_id,
          hour_per_piece: jobEdit.hour_per_piece,
          blank_job_id: jobEdit.job_pk_id,
        },
        {
          headers: {
            Authorization: `Bearer 6539a1e806bbc2c09436b39c62615425`,
          },
        }
      )

      const newItemsJobs = itemsJobs.map((j) => {
        const jobUpdated = response.data.find((job) => job.id === j.job_pk_id)

        if(!jobUpdated){
          return j
        }

        const job = jobs.find((job) => {
          const jobNumber = job.split(' - ')[0]
          return Number(jobNumber) === jobUpdated.job_listing_id
        })

        if(!job){
          return j
        }

        return {
          ...j,
          hour_per_piece: jobUpdated.hour_per_piece,
          job_listing_id: jobUpdated.job_listing_id,
          job_number: jobUpdated.job_listing_id,
          description: job.split(' - ')[1],
        }
      })

      setItemsJobs(newItemsJobs)
      onUpdate(newItemsJobs)
    }

    setOpenModal(false)
  }

  const toggleDisplay = (field) => {
    return {
      inventory: { display: field === 'inventory' ? '' : 'none' },
      pricing: { display: field === 'pricing' ? '' : 'none' },
    }
  }

  const handleOverheadCost = (e) => {
    const value = e.target.value

    setStyle(toggleDisplay(value))
    setOverheadCost(value)
  }

  const editJob = (job) => {
    setOpenModal(true)
    setJobEdit(job)
  }

  const selectJobNumerEdit = (event, data) => {
    if(!data){
      return
    }
  
    const value = data?.split(' - ')

    setJobEdit({
      ...jobEdit,
      job_listing_id: Number(value[0]),
      job_number: value[0],
      description: value[1],
    })
  }

  useEffect(() => {
    fetchItems().then(({ data }) => {
      const items = data.map(
        (item) => `${item.item_number} - ${item.description}`
      )
      setItems(items)
    })

    fetchJobs().then(({ data }) => {
      const jobs = data.map(
        (job) => `${job.job_number} - ${job.description}`
      )
      setJobs(jobs)
    })
  }, [])

  useEffect(() => {
    setItemsJobs(jobsInitial)
  }, [jobsInitial])

  const jobField = (job, index) => {
    return (
      <TableRow key={index} style={{ borderTop: '1px solid #cdcdcd' }}>
        <th style={{ width: '30%', textAlign: 'left', fontWeight: 400 }}>
          <span>{job.job_number} - {job.description}</span>
        </th>
        <th style={{ fontWeight: 400 }}>
          ${job.wages_per_hour}
        </th>
        <th style={{ fontWeight: 400 }}>
          {job.hour_per_piece}
        </th>
        <th style={{ fontWeight: 400 }}>
          ${job.direct_labor_cost}
        </th>
        <th style={{...style.pricing, fontWeight: 400}}>
          ${job.overhead_pricing_cost}
        </th>
        <th style={{...style.inventory, fontWeight: 400}}>
          ${job.overhead_inventory_cost}
        </th>
        <th>
          <IconButton
            onClick={() => editJob(job)}
          >
            <ContentCreate />
          </IconButton>
          <IconButton
            onClick={() => handleRemoveJob(job)}
          >
            <DeleteIcon />
          </IconButton>
        </th>
      </TableRow>
    )
  }

  return (
    <>
      {itemsJobs?.length > 0
        ?
          <div style={{ width: '100%'}}>
            <h2>Job</h2>

            <FormControl style={{ width: '100%', maxWidth: '300px'}}>
              <InputLabel
                id='titleOverheadCost'
              >
                Overhead Cost
              </InputLabel>
              <Select
                labelId='titleOverheadCost'
                value={overheadCost}
                onChange={handleOverheadCost}
              >
                <MenuItem value={'inventory'}>Inventory</MenuItem>
                <MenuItem value={'pricing'}>Pricing</MenuItem>
              </Select>
            </FormControl>

            <Table style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              <thead style={{ color: '#b7b7b7' }}>
                <TableRow>
                  <th style={{ width: '30%' }}>
                    Job#
                  </th>
                  <th>Wages($)/hr</th>
                  <th>Hr/pcs</th>
                  <th>Direct Labor ($)</th>
                  <th style={style.pricing}>
                    Pricing ($)
                  </th>
                  <th style={style.inventory}>
                    Inventory ($)
                  </th>
                  <th></th>
                </TableRow>
              </thead>

              <TableBody>
                {itemsJobs?.map((job, index) => {
                  if(!job.deleted) return jobField(job, index)
                })}
              </TableBody>
            </Table>

            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Card style={{ padding: '1rem', width: '100%', maxWidth: '500px' }}>
                <h2 style={{ borderBottom: '1px solid #cdcdcd', padding: '0.5rem'}}>
                  Edit Job
                </h2>

                <Autocomplete
                  options={jobs}
                  value={jobEdit?.job_number + ' - ' + jobEdit?.description}
                  onChange={selectJobNumerEdit}
                  renderInput={(params) =>
                    <TextField {...params} label='Type the job number' />
                  }
                />

                <TextField
                  fullWidth
                  type='number'
                  label='Hour Per Piece'
                  name='hour_per_piece'
                  value={jobEdit?.hour_per_piece}
                  onChange={(e) => setJobEdit({ ...jobEdit, hour_per_piece: e.target.value })}
                />

                <Box>
                  <Button
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={handleEditJob}
                  >
                    Update
                  </Button>
                </Box>
              </Card>
            </Modal>
          </div>
        : 
          <div>
            No job(s)
          </div>
      }
    </>
  )
  
}

export default JobTable
