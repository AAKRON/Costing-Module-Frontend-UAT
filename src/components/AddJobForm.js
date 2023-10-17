import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  TextField
} from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { useNotify, useRefresh } from 'react-admin'
import restClient from '../providers/restClient'

const AddJobForm = ({
  data,
  docNumber,
  type,
  callback,
}) => {
  const notify = useNotify()
  const refresh =useRefresh()
  const [newJobs, setNewJobs] = useState([])
  const [jobs, setJobs] = useState([])

  const removeJob = (job) => {
    const jobsTemp = [...newJobs]
    const newJobsTemp = jobsTemp.filter((j) => j.job_listing_id !== job.job_listing_id)
    setNewJobs(newJobsTemp)
  }

  const fetchJobs = () => {
    return restClient.getList('job-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })
  }

  const selectJobNumerEdit = (data, index) => {
    if(!data){
      updateNewJob(index, { job_listing_id: '' })
      return
    }
  
    const jobId = data?.split(' - ')[0]
    updateNewJob(index, { job_listing_id: jobId })
  }

  const updateNewJob = (jobIndex, newValues) => {
    const updatedJobs = [...newJobs]
    updatedJobs[jobIndex] = { ...updatedJobs[jobIndex], ...newValues }
    setNewJobs(updatedJobs)
  }

  const jobField = (job, jobIndex) => {
    return (
      <div
        style={{
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: '1fr 1fr auto',
          gap: '1rem',
        }}
      >
        <Autocomplete
          options={
            jobs.filter((j) => !newJobs.some((nj) => nj.job_listing_id == j.job_number))
              .filter((j) => !data.jobs.some((dj) => dj.job_listing_id == j.job_number))
              .sort((a, b) => a.job_number - b.job_number)
              .map((job) => `${job.job_number} - ${job.description}`)
          }
          onChange={(e, data) => selectJobNumerEdit(data, jobIndex)}
          value={job.job_listing_id
            ? `${job.job_listing_id} - ${jobs.find((j) => j.job_number == job.job_listing_id)?.description}`
            : ''
          }
          renderInput={(params) =>
            <TextField {...params} label='Type the job number' />
          }
        />

        <TextField
          label='Hour Per Piece'
          name='hour_per_piece'
          type='number'
          onChange={(e) => updateNewJob(jobIndex, { hour_per_piece: e.target.value })}
          value={job.hour_per_piece}
        />

        <IconButton
          onClick={() => removeJob(job)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    )
  }

  const submitForm = async(e) => {
    e.preventDefault()

    if(newJobs.length === 0){
      notify('Please add at least one job')
      return
    }

    if(!newJobs.every((newJob) =>
      newJob.job_listing_id && newJob.hour_per_piece
    )){
      notify('Please fill all the fields')
      return
    }

    if(type === 'blank'){
      const response = await restClient.update('update-blank-jobs-only', {
        id: docNumber,
        data: {
          blank_number: docNumber,
          copy_jobs: newJobs,
        },
      })

      if(response){
        notify('Job(s) added successfully')
        callback()
        refresh()
      }else{
        notify('Job(s) failed to add')
      }
    }

    if(type === 'item'){
      const response = await restClient.update('update-item-jobs-only', {
        id: docNumber,
        data: {
          item_number: docNumber,
          copy_jobs: newJobs,
        },
      })

      if(response){
        notify('Job(s) added successfully')
        callback()
        refresh()
      }else{
        notify('Job(s) failed to add')
      }
    }
  }

  useEffect(() => {
    fetchJobs().then(({ data }) => {
      setJobs(data)
    })
  }, [])

  return (
    <form
      onSubmit={submitForm}
    >
      <Box sx={{
        padding: '1rem',
      }}>
        <TextField
          type='text'
          disabled={true}
          label={`Type the ${type} number`}
          fullWidth
          value={
            `${type === 'blank' ? data.blank_number : data.item_number} - ${data.description}`
          }
        />

        <Button
          sx={{
            marginTop: '1rem',
          }}
          onClick={() => setNewJobs([...newJobs, { job_listing_id: '', hour_per_piece: '' }])}
        >
          <AddBoxIcon />
          Add Job
        </Button>

        <div
        style={{
          marginTop: '1rem',
          maxHeight: '300px',
          overflow: 'auto',
        }}
        >
          {newJobs.map((newJob, index) => (
            <Fragment key={index}>
              {jobField(newJob, index)}
            </Fragment>
          ))}
        </div>
      </Box>

      <Divider />

      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '1rem',
      }}>
        <Button
          onClick={callback}
        >
          Cancel
        </Button>
        {newJobs.length > 0 &&
          <Button
            type='submit'
          >
            Add Over
          </Button>
        }
      </Box>
    </form>
  )
}

export default AddJobForm
