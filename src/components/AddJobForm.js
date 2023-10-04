import { GET_LIST, UPDATE } from 'admin-on-rest';
import axios from 'axios';
import lodash from 'lodash';
import AutoComplete from 'material-ui/AutoComplete';
import AddJobButton from 'material-ui/FlatButton';
import RemoveJobButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import AddBoxIcon from 'material-ui/svg-icons/content/add-box';
import React from 'react';
import { stringHelpers } from '../helpers/stringHelpers';
import restClient from '../restClient';

class AddJobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blank: '',
      item: '',
      item_number: 0,
      blank_number: 0,
      copy_jobs: [],
      done: false,
      errors: {},
      loading: false,
      items: [],
      jobs: [],
      open_snackbar: false,
      snackbar_message: '',
      type: props.type,
      blanks: [],
    };
  }

  fetchItems = () =>
    restClient(GET_LIST, 'item-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    });

  fetchBlanks = () =>
    restClient(GET_LIST, 'blank-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    });

  fetchJobs = () =>
    restClient(GET_LIST, 'job-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    });

  handleSnackbarClose = () =>
    this.setState({ open_snackbar: false, snackbar_message: '' });

  componentDidMount() {
    if (this.state.type === 'item') {
      axios.all([this.fetchItems(), this.fetchJobs()]).then(
        axios.spread((item, job) => {
          const items = item.data.map(
            (item) => `${item.item_number} - ${item.description}`
          );
          const jobs = job.data.map(
            (job) => `${job.job_number} - ${job.description}`
          );
          this.setState({ items, jobs });

          const defaultItemNumber =
            this.props.data.item_number || this.state.item_number;
          this.setState({ item_number: defaultItemNumber });

          const defaultItem = this.state.items.find((item) => {
            const itemNumber = stringHelpers.extractLeadingNumber(item);

            return itemNumber === this.state.item_number;
          });

          const defaultItemText = defaultItem || this.state.item_number;
          this.setState({ item: defaultItemText });
        })
      );
    } else {
      axios.all([this.fetchBlanks(), this.fetchJobs()]).then(
        axios.spread((blank, job) => {
          const blanks = blank.data.map(
            (blank) => `${blank.blank_number} - ${blank.description}`
          );
          const jobs = job.data.map(
            (job) => `${job.job_number} - ${job.description}`
          );
          this.setState({ blanks, jobs });

          const defaultBlankNumber =
            this.props.data.blank_number || this.state.blank_number;
          this.setState({ blank_number: defaultBlankNumber });

          const defaultBlank = this.state.blanks.find((blank) => {
            const blankNumber = stringHelpers.extractLeadingNumber(blank);

            return blankNumber === this.state.blank_number;
          });

          const defaultBlankText = defaultBlank || this.state.blank_number;
          this.setState({ blank: defaultBlankText });
        })
      );
    }
  }

  componentWillMount() {
    let { copy_jobs, jobs } = this.props.data;
    const fieldsToPick = ['job_listing_id', 'hour_per_piece', 'description'];
    if (typeof jobs === 'object') {
      copy_jobs = jobs
        .filter((obj) => obj.selected)
        .map((obj) => lodash.pick(obj, fieldsToPick));
      this.setState({ copy_jobs });
    }
  }

  handleAddNewJob = () => {
    this.setState({
      copy_jobs: this.state.copy_jobs.concat([
        { job_listing_id: '', hour_per_piece: '' },
      ]),
    });
  };

  handleRemoveJob = (jobIndex) => () => {
    this.setState({
      copy_jobs: this.state.copy_jobs.filter(
        (job, index) => jobIndex !== index
      ),
    });
  };

  handleJobFieldChange = (jobIndex) => (event, value) => {
    const newJob = this.state.copy_jobs.map((job, index) => {
      if (jobIndex !== index) return job;
      return { ...job, [event.target.name]: value };
    });

    this.setState({ copy_jobs: newJob });
  };

  handleJobFieldSelectChange = (jobIndex) => (value) => {
    const newJob = this.state.copy_jobs.map((job, index) => {
      if (jobIndex !== index) return job;
      value = stringHelpers.extractLeadingNumber(value);
      job.job_listing_id = value;
      return { ...job, value };
    });

    this.setState({ copy_jobs: newJob });
  };

  submit = (dialogClose) => {
    const payload =
      this.state.type === 'item'
        ? lodash.pick(this.state, ['item_number', 'copy_jobs'])
        : lodash.pick(this.state, ['blank_number', 'copy_jobs']);
    var type_id =
      this.state.type === 'item' ? payload.item_number : payload.blank_number;
    var eventAction =
      this.state.type === 'item'
        ? 'update-item-jobs-only'
        : 'update-blank-jobs-only';

    if (type_id === 0) {
      this.setState({
        open_snackbar: true,
        snackbar_message: 'Please select ' + this.state.type + ' number',
      });
      return false;
    }

    restClient(UPDATE, eventAction, {
      id: type_id,
      data: payload,
    }).then((response) => {
      this.setState({
        open_snackbar: true,
        snackbar_message: 'Jobs copied successfully',
      });

      if (type_id === this.props.data.id) {
        window.location.reload();
      }
      setTimeout(() => {
        dialogClose();
      }, 700);
    });
  };

  jobField = (job, jobIndex) => {
    const defaultJob =
      job.job_listing_id && job.description
        ? job.job_listing_id + ' - ' + job.description
        : '';

    return (
      <div key={jobIndex}>
        <AutoComplete
          floatingLabelText='Type the job number'
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.jobs}
          name='job_listing_id'
          maxSearchResults={5}
          onUpdateInput={this.handleJobFieldSelectChange(jobIndex)}
          fullWidth={false}
          searchText={defaultJob}
        />
        &nbsp;&nbsp;
        <TextField
          hintText='Hour Per Piece'
          floatingLabelText='Hour Per Piece'
          errorText=''
          name='hour_per_piece'
          onChange={this.handleJobFieldChange(jobIndex)}
          defaultValue={job.hour_per_piece}
        />
        <RemoveJobButton onClick={this.handleRemoveJob(jobIndex)}>
          <DeleteIcon />
        </RemoveJobButton>
      </div>
    );
  };

  render() {
    const form = (
      <form onSubmit={this.submitForm}>
        <AutoComplete
          floatingLabelText={`Type the ${this.state.type} number`}
          filter={AutoComplete.fuzzyFilter}
          disabled={true}
          dataSource={
            this.state.type === 'item' ? this.state.items : this.state.blanks
          }
          maxSearchResults={5}
          onUpdateInput={(item_description) => {
            if (this.state.type === 'item') {
              const itemNumber =
                stringHelpers.extractLeadingNumber(item_description);
              const item = this.state.items.find((item) => {
                const number = stringHelpers.extractLeadingNumber(item);
                return number === itemNumber;
              });
              const newItem = item || itemNumber;

              this.setState({ item: newItem, item_number: itemNumber });
            } else {
              const blankNumber =
                stringHelpers.extractLeadingNumber(item_description);
              const blank = this.state.blanks.find((blank) => {
                const number = stringHelpers.extractLeadingNumber(blank);
                return number === blankNumber;
              });
              const newBlank = blank || blankNumber;

              this.setState({ blank: newBlank, blank_number: blankNumber });
            }
          }}
          fullWidth={true}
          searchText={
            this.state.type === 'item' ? this.state.item : this.state.blank
          }
        />
        <br />
        <br />
        <AddJobButton
          label='Add Job'
          icon={<AddBoxIcon />}
          onTouchTap={this.handleAddNewJob}
          primary
        />
        <br />
        <br />
        {this.state.copy_jobs.map(this.jobField)}

        <Snackbar
          open={this.state.open_snackbar}
          message={this.state.snackbar_message}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </form>
    );

    return <div> {form} </div>;
  }
}

export { AddJobForm };
