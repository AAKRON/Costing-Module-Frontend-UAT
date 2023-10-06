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
import React, { useEffect, useState } from 'react'
import { useEditController } from 'react-admin'
import restClient from '../providers/restClient'

const JobTable = () => {
  const blankJob = useEditController()
  const [itemsJobs, setItemsJobs] = useState([])
  const [items, setItems] = useState([])
  const [jobs, setJobs] = useState([])
  const [jobEdit, setJobEdit] = useState({})
  const [overheadCost, setOverheadCost] = useState('pricing')
  const [openModal, setOpenModal] = useState(false)
  const [style, setStyle] = useState({
    inventory: { display: 'none' },
    pricing: { display: '' }
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
    const currentItemJobs = itemsJobs.filter((j) => j.job_pk_id !== job.job_pk_id)
  
    const jobDeleted = blankJob?.record?.jobs.find((j) => j.job_pk_id === job.job_pk_id)

    if(jobDeleted){
      jobDeleted.deleted = true
    }

    setItemsJobs(currentItemJobs)

    console.log('currentItemJobs', currentItemJobs)
    console.log('currentItemJobs', blankJob.record.jobs)
  }

  // handleEditJob = async () => {
  //   const { EditIndex, EditableJob } = this.state;

  //   const tempJob = this.state.item_jobs;
  //   tempJob[EditIndex] = { ...EditableJob, selected: false };
  //   this.setState({
  //     item_jobs: tempJob,
  //     open: false,
  //     tableBodyRenderKey: this.state.tableBodyRenderKey + 1,
  //   });
  //   //call API to update job
  //   // const data = restClient(UPDATE, 'update-item-job-data', {
  //   //   item_number: 98010,
  //   //   job_listing_id: 3,
  //   //   hour_per_piece: '0.0025',
  //   //   item_job_id: 18583,
  //   // });

  //   if (this.props.resource === 'blank_jobs') {
  //     console.log('blank_number', this.props.record.blank_number);
  //     const newdata = await axios.put(
  //       'https://costing-module-api-heroku-20.herokuapp.com/api/v1/update-blank-job-data',
  //       {
  //         blank_number: this.props.record.blank_number,
  //         job_listing_id: EditableJob.job_listing_id,
  //         hour_per_piece: EditableJob.hour_per_piece,
  //         blank_job_id: EditableJob.job_pk_id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer 6539a1e806bbc2c09436b39c62615425`,
  //         },
  //       }
  //     );
  //     this.props.record.jobs = newdata;
  //   }
  //   if (this.props.resource === 'item_jobs') {
  //     console.log('item_number', this.props.record.item_number);
  //     const newdata = await axios.put(
  //       'https://costing-module-api-heroku-20.herokuapp.com/api/v1/update-item-job-data',
  //       {
  //         item_number: this.props.record.item_number,
  //         job_listing_id: EditableJob.job_listing_id,
  //         hour_per_piece: EditableJob.hour_per_piece,
  //         item_job_id: EditableJob.job_pk_id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer 6539a1e806bbc2c09436b39c62615425`,
  //         },
  //       }
  //     );
  //     this.props.record.jobs = newdata;
  //   }

  //   // console.log(this.props.record);
  // };

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
      job_listing_id: value[0],
      job_number: value[0],
      description: value[1],
    })
  }

  // COMMENT
  //   handleJobFieldSelectChange = (jobIndex) => (value) => {
  //     const newJob = this.state.copy_jobs.map((job, index) => {
  //       if (jobIndex !== index) return job;
  //       value = stringHelpers.extractLeadingNumber(value);
  //       job.job_listing_id = value;
  //       return { ...job, value };
  //     });

  //     this.setState({ copy_jobs: newJob });
  //   };
  // COMMENT

  // handleJobFieldChange = (jobIndex) => (event, value) => {
  //   const { id, description } = this.state;

  //   this.setState({
  //     EditableJob: {
  //       ...this.state.EditableJob,
  //       job_listing_id: Number(id),
  //       job_number: Number(id),
  //       description,
  //       [event.target.name]: value,
  //     },
  //   });
  // };

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
    console.log('blankJob', blankJob.record)
    setItemsJobs(blankJob?.record?.jobs || [])
  }, [blankJob.record])

  const jobField = (job, index) => {
    return (
      <TableRow key={index} style={{ borderTop: '1px solid #cdcdcd'}}>
        <th style={{ width: '30%', textAlign: 'left' }}>
          <span>{job.job_number} - {job.description}</span>
        </th>
        <th>${job.wages_per_hour}</th>
        <th>{job.hour_per_piece}</th>
        <th>${job.direct_labor_cost}</th>
        <th style={style.pricing}>
          ${job.overhead_pricing_cost}
        </th>
        <th style={style.inventory}>
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

  if(itemsJobs?.length > 0){
    return (
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
            {itemsJobs?.map((job, index) => jobField(job, index))}
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
                // onClick={handleEditJob}
              >
                Update
              </Button>
            </Box>
          </Card>
        </Modal>
      </div>
    )
  }
  
  return (
    <div>
      No job(s)
    </div>
  )
}

export default JobTable
