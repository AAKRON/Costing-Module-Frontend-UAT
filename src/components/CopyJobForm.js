import {
  Autocomplete,
  Box,
  Button,
  Divider,
  TextField,
} from '@mui/material'
import { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import { useNotify, useRefresh } from 'react-admin'
import { stringHelpers } from '../helpers/stringHelpers'
import restClient from '../providers/restClient'

const CopyJobForm = ({ data, docNumber, type, callback }) => {
  const notify = useNotify()
  const refresh = useRefresh()
  const [blanks, setBlanks] = useState([])
  const [items, setItems] = useState([])
  // const [jobs, setJobs] = useState([])
  const [copyJobs, setCopyJobs] = useState([])
  const [selectOption, setSelectOption] = useState(null)

  const fetchBlanks = () => {
    return restClient.getList('blank-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })
  }

  const fetchItems = () => {
    return restClient.getList('item-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })
  }

  // const fetchJobs = () => {
  //   return restClient.getList('job-list-only', {
  //     pagination: { page: 1, perPage: -1 },
  //     sort: { field: 'id', order: 'ASC' },
  //   })
  // }

  const submitForm = async(e) => {
    e.preventDefault()

    if(!selectOption){
      notify('Please select ' + type + ' number')
    }
  
    const id = stringHelpers.extractLeadingNumber(selectOption)

    if(type === 'blank'){
      const response = await restClient.update('update-blank-jobs-only', {
        id: id,
        data: {
          blank_number: id,
          copy_jobs: copyJobs,
        },
      })

      if(response){
        notify('Job(s) copied successfully')
        callback()
        refresh()
      }else{
        notify('Job(s) failed to copy')
      }
    }

    if(type === 'item'){
      const response = await restClient.update('update-item-jobs-only', {
        id: id,
        data: {
          item_number: id,
          copy_jobs: copyJobs,
        },
      })

      if(response){
        notify('Job(s) copied successfully')
        callback()
        refresh()
      }else{
        notify('Job(s) failed to copy')
      }
    }
  }

  const jobField = (job) => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}
      >
        <TextField
          label='Job Number'
          value={job.job_listing_id + ' - ' + job.description}
          disabled={true}
        />

        <TextField
          label='Hour Per Piece'
          value={job.hour_per_piece}
          disabled={true}
        />
      </div>
    )
  }

  useEffect(() => {
    // fetchJobs().then(({ data }) => {
    //   setJobs(data)
    // }).catch((err) => {
    //   console.log('Error fetching jobs', err)
    // })

    if (type === 'item') {
      fetchItems().then(({ data }) => {
        setItems(data)
      }).catch((err) => {
        console.log('Error fetching items', err)
      })
    }else{
      fetchBlanks().then(({ data }) => {
        setBlanks(data)
      }).catch((err) => {
        console.log('Error fetching blanks', err)
      })
    }
  }, [])


  useLayoutEffect(() => {
    const formatedJobs = data.jobs.map((job) => ({
      description: job.description,
      job_listing_id: job.job_listing_id,
      hour_per_piece: job.hour_per_piece,
      value: job.job_listing_id,
    }))

    setCopyJobs(formatedJobs)
  }, [])

  return (
    <form
      onSubmit={submitForm}
    >
      <Box sx={{
        padding: '1rem',
      }}>
        <Autocomplete
          options={
            type === 'item'
            ? items.filter((i) => i.item_number != docNumber)
                .sort((a, b) => a.item_number - b.item_number)
                .map((item) => `${item.item_number} - ${item.description}`)
            : blanks.filter((b) => b.blank_number != docNumber)
                .sort((a, b) => a.blank_number - b.blank_number)
                .map((blank) => `${blank.blank_number} - ${blank.description}`)
          }
          onChange={(e, data) => setSelectOption(data)}
          value={selectOption}
          renderInput={(params) =>
            <TextField {...params} label={`Type the ${type} number`} />
          }
        />

        {copyJobs.map((job, index) => (
          <Fragment key={index}>
            {jobField(job)}
          </Fragment>
        ))}
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
        {selectOption &&
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

export default CopyJobForm
