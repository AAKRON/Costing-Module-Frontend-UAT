// import { GET_LIST, UPDATE } from 'admin-on-rest';
// import axios from 'axios';
// import lodash from 'lodash';
// import AutoComplete from 'material-ui/AutoComplete';
// import AddJobButton from 'material-ui/FlatButton';
// import RemoveJobButton from 'material-ui/IconButton';
// import Snackbar from 'material-ui/Snackbar';
// import TextField from 'material-ui/TextField';
// import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
// import AddBoxIcon from 'material-ui/svg-icons/content/add-box';
// import React from 'react';
// import { stringHelpers } from '../helpers/stringHelpers';
// import restClient from '../restClient';
import AddBoxIcon from '@mui/icons-material/AddBox'
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Snackbar,
  TextField
} from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import restClient from '../providers/restClient'

const AddJobForm = ({
  data,
  type,
  callback,
}) => {
  const [newJobs, setNewJobs] = useState([])
  const [jobs, setJobs] = useState([])
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  })

  const handleSnackbarClose = () => setSnackbar({
    open: false,
    message: '',
  })

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     blank: '',
  //     item: '',
  //     item_number: 0,
  //     blank_number: 0,
  //     copy_jobs: [],
  //     done: false,
  //     errors: {},
  //     loading: false,
  //     items: [],
  //     jobs: [],
  //     open_snackbar: false,
  //     snackbar_message: '',
  //     type: props.type,
  //     blanks: [],
  //   };
  // }

  // fetchItems = () =>
  //   restClient(GET_LIST, 'item-list-only', {
  //     pagination: { page: 1, perPage: -1 },
  //     sort: { field: 'id', order: 'ASC' },
  //   });

  // fetchBlanks = () =>
  //   restClient(GET_LIST, 'blank-list-only', {
  //     pagination: { page: 1, perPage: -1 },
  //     sort: { field: 'id', order: 'ASC' },
  //   });

  // fetchJobs = () =>
  //   restClient(GET_LIST, 'job-list-only', {
  //     pagination: { page: 1, perPage: -1 },
  //     sort: { field: 'id', order: 'ASC' },
  //   });

  // handleSnackbarClose = () =>
  //   this.setState({ open_snackbar: false, snackbar_message: '' });

  // componentDidMount() {
  //   if (this.state.type === 'item') {
  //     axios.all([this.fetchItems(), this.fetchJobs()]).then(
  //       axios.spread((item, job) => {
  //         const items = item.data.map(
  //           (item) => `${item.item_number} - ${item.description}`
  //         );
  //         const jobs = job.data.map(
  //           (job) => `${job.job_number} - ${job.description}`
  //         );
  //         this.setState({ items, jobs });

  //         const defaultItemNumber =
  //           this.props.data.item_number || this.state.item_number;
  //         this.setState({ item_number: defaultItemNumber });

  //         const defaultItem = this.state.items.find((item) => {
  //           const itemNumber = stringHelpers.extractLeadingNumber(item);

  //           return itemNumber === this.state.item_number;
  //         });

  //         const defaultItemText = defaultItem || this.state.item_number;
  //         this.setState({ item: defaultItemText });
  //       })
  //     );
  //   } else {
  //     axios.all([this.fetchBlanks(), this.fetchJobs()]).then(
  //       axios.spread((blank, job) => {
  //         const blanks = blank.data.map(
  //           (blank) => `${blank.blank_number} - ${blank.description}`
  //         );
  //         const jobs = job.data.map(
  //           (job) => `${job.job_number} - ${job.description}`
  //         );
  //         this.setState({ blanks, jobs });

  //         const defaultBlankNumber =
  //           this.props.data.blank_number || this.state.blank_number;
  //         this.setState({ blank_number: defaultBlankNumber });

  //         const defaultBlank = this.state.blanks.find((blank) => {
  //           const blankNumber = stringHelpers.extractLeadingNumber(blank);

  //           return blankNumber === this.state.blank_number;
  //         });

  //         const defaultBlankText = defaultBlank || this.state.blank_number;
  //         this.setState({ blank: defaultBlankText });
  //       })
  //     );
  //   }
  // }

  // componentWillMount() {
  //   let { copy_jobs, jobs } = this.props.data;
  //   const fieldsToPick = ['job_listing_id', 'hour_per_piece', 'description'];
  //   if (typeof jobs === 'object') {
  //     copy_jobs = jobs
  //       .filter((obj) => obj.selected)
  //       .map((obj) => lodash.pick(obj, fieldsToPick));
  //     this.setState({ copy_jobs });
  //   }
  // }

  // handleRemoveJob = (jobIndex) => () => {
  //   this.setState({
  //     copy_jobs: this.state.copy_jobs.filter(
  //       (job, index) => jobIndex !== index
  //     ),
  //   });
  // };

  // handleJobFieldChange = (jobIndex) => (event, value) => {
  //   const newJob = this.state.copy_jobs.map((job, index) => {
  //     if (jobIndex !== index) return job;
  //     return { ...job, [event.target.name]: value };
  //   });

  //   this.setState({ copy_jobs: newJob });
  // };

  // handleJobFieldSelectChange = (jobIndex) => (value) => {
  //   const newJob = this.state.copy_jobs.map((job, index) => {
  //     if (jobIndex !== index) return job;
  //     value = stringHelpers.extractLeadingNumber(value);
  //     job.job_listing_id = value;
  //     return { ...job, value };
  //   });

  //   this.setState({ copy_jobs: newJob });
  // };

  // submit = (dialogClose) => {
  //   const payload =
  //     this.state.type === 'item'
  //       ? lodash.pick(this.state, ['item_number', 'copy_jobs'])
  //       : lodash.pick(this.state, ['blank_number', 'copy_jobs']);
  //   var type_id =
  //     this.state.type === 'item' ? payload.item_number : payload.blank_number;
  //   var eventAction =
  //     this.state.type === 'item'
  //       ? 'update-item-jobs-only'
  //       : 'update-blank-jobs-only';

  //   if (type_id === 0) {
  //     this.setState({
  //       open_snackbar: true,
  //       snackbar_message: 'Please select ' + this.state.type + ' number',
  //     });
  //     return false;
  //   }

  //   restClient(UPDATE, eventAction, {
  //     id: type_id,
  //     data: payload,
  //   }).then((response) => {
  //     this.setState({
  //       open_snackbar: true,
  //       snackbar_message: 'Jobs copied successfully',
  //     });

  //     if (type_id === this.props.data.id) {
  //       window.location.reload();
  //     }
  //     setTimeout(() => {
  //       dialogClose();
  //     }, 700);
  //   });
  // };

  // jobField = (job, jobIndex) => {
  //   const defaultJob =
  //     job.job_listing_id && job.description
  //       ? job.job_listing_id + ' - ' + job.description
  //       : '';

  //   return (
  //     <div key={jobIndex}>
  //       <AutoComplete
  //         floatingLabelText='Type the job number'
  //         filter={AutoComplete.fuzzyFilter}
  //         dataSource={this.state.jobs}
  //         name='job_listing_id'
  //         maxSearchResults={5}
  //         onUpdateInput={this.handleJobFieldSelectChange(jobIndex)}
  //         fullWidth={false}
  //         searchText={defaultJob}
  //       />
  //       &nbsp;&nbsp;
  //       <TextField
  //         hintText='Hour Per Piece'
  //         floatingLabelText='Hour Per Piece'
  //         errorText=''
  //         name='hour_per_piece'
  //         onChange={this.handleJobFieldChange(jobIndex)}
  //         defaultValue={job.hour_per_piece}
  //       />
  //       <RemoveJobButton onClick={this.handleRemoveJob(jobIndex)}>
  //         <DeleteIcon />
  //       </RemoveJobButton>
  //     </div>
  //   );
  // };


  const fetchJobs = () => {
    return restClient.getList('job-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })
  }

    const selectJobNumerEdit = (data, index) => {
      if(!data){
        newJobs[index].job_listing_id = ''
        return
      }
    
      const jobId = data?.split(' - ')[0]
      newJobs[index].job_listing_id = Number(jobId)
    }

  const jobField = (job, jobIndex) => {
    return (
      <div>
        <Autocomplete
          options={
            jobs.filter((job) => !newJobs.some((newJob) => newJob.job_listing_id === job.id)).map((job) => `${job.job_number} - ${job.description}`)
          }
          onChange={(e, data) => selectJobNumerEdit(data, jobIndex)}
          renderInput={(params) =>
            <TextField {...params} label='Type the job number' />
          }
        />
      </div>
    )
  }

  useEffect(() => {
    fetchJobs().then(({ data }) => {
      setJobs(data)
    })
  }, [])

  return (
    <form
      // onSubmit={this.submitForm}
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

        <Snackbar
          open={snackbar.open}
          message={snackbar.message}
          autoHideDuration={4000}
          onRequestClose={handleSnackbarClose}
          onClick={handleSnackbarClose}
        />
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
        <Button
          onClick={callback}
        >
          Add Over
        </Button>
      </Box>
    </form>
  )
}

export default AddJobForm
