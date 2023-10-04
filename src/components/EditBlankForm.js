/* eslint-disable */
import React from "react";
import AutoComplete from "material-ui/AutoComplete";
import axios from "axios";
import lodash from "lodash";
// import TextField from "material-ui/TextField";
import RemoveJobButton from "material-ui/IconButton";
import DeleteIcon from "material-ui/svg-icons/action/delete-forever";
// import AddBoxIcon from "material-ui/svg-icons/content/add-box";
// import AddJobButton from "material-ui/FlatButton";
import { stringHelpers } from "../helpers/stringHelpers";
import { GET_LIST, UPDATE, GET_ONE } from "admin-on-rest";
import restClient from "../restClient";
import Snackbar from "material-ui/Snackbar";

class EditBlankForm extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      item_number: 0,
      blank_number: 0,
      copy_jobs: [],
      done: false,
      errors: {},
      loading: false,
      items: [],
      jobs: [],
      open_snackbar: false,
      snackbar_message: "",
      type: props.type,
      blanks: [],
      item_blanks: [],
    };
  }

  fetchBlankListByItem = () =>
    restClient(GET_ONE, `blanks_listing_by_items`, {
      id: this.props.data.id,
    });

  fecthBLIWC = () =>
    restClient(GET_ONE, `blanks_listing_item_with_costs`, {
      id: this.props.data.id,
    });
  fetchItems = () =>
    restClient(GET_LIST, "item-list-only", {
      pagination: { page: 1, perPage: -1 },
      sort: { field: "id", order: "ASC" },
    });

  fetchBlanks = () =>
    restClient(GET_LIST, "blank-list-only", {
      pagination: { page: 1, perPage: -1 },
      sort: { field: "id", order: "ASC" },
    });

  fetchJobs = () =>
    restClient(GET_LIST, "job-list-only", {
      pagination: { page: 1, perPage: -1 },
      sort: { field: "id", order: "ASC" },
    });

  handleSnackbarClose = () =>
    this.setState({ open_snackbar: false, snackbar_message: "" });
  componentDidMount() {
    if (this.state.type === "blank") {
      axios
        .all([
          this.fetchItems(),
          this.fetchBlanks(),
          this.props.path === "/blanks_listing_by_items"
            ? this.fetchBlankListByItem()
            : this.fecthBLIWC(),
        ])
        .then(
          axios.spread((item, blank, bliwc) => {
            const items = item.data.map(
              (item) => `${item.item_number} - ${item.description}`
            );
            const blanks = blank.data.map(
              (blank) => `${blank.job_number} - ${blank.description}`
            );
            const blank_data = bliwc.data;
            const item_blanks = blank_data.blanks_listing_by_item;

            this.setState({ items, blanks, item_blanks });

            // this.setState({ items, blanks });
          })
        );
    }
    // else {
    //   axios.all([this.fetchBlanks(), this.fetchJobs()]).then(
    //     axios.spread((blank, job) => {
    //       const blanks = blank.data.map(
    //         (blank) => `${blank.blank_number} - ${blank.description}`
    //       );
    //       const jobs = job.data.map(
    //         (job) => `${job.job_number} - ${job.description}`
    //       );
    //       this.setState({ blanks, jobs });
    //     })
    //   );
    // }
  }

  componentWillMount() {
    let { copy_jobs, jobs } = this.props.data;
    const fieldsToPick = ["job_listing_id", "hour_per_piece", "description"];
    if (typeof jobs === "object") {
      copy_jobs = jobs
        .filter((obj) => obj.selected)
        .map((obj) => lodash.pick(obj, fieldsToPick));
      this.setState({ copy_jobs });
    }
  }

  handleAddNewJob = () => {
    this.setState({
      copy_jobs: this.state.copy_jobs.concat([
        { job_listing_id: "", hour_per_piece: "" },
      ]),
    });
  };

  handleRemoveJob = (jobIndex) => () => {
    console.log("Removing job at index", jobIndex);

    const newJobs = this.state.copy_jobs.filter(
      (job, index) => jobIndex !== index
    );

    console.log("New job list", newJobs);

    this.setState({
      copy_jobs: newJobs,
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
    // console.log(lodash.pick(this.state, ["blank_number", "copy_jobs"]));
    const payload =
      this.state.type === "item"
        ? lodash.pick(this.state, ["item_number", "copy_jobs"])
        : lodash.pick(this.state, ["blank_number", "copy_jobs"]);
    var type_id =
      this.state.type === "item" ? payload.item_number : payload.blank_number;
    var eventAction =
      this.state.type === "item"
        ? "update-item-jobs-only"
        : "update-blank-jobs-only";
    // console.log(type_id);
    if (type_id === 0) {
      this.setState({
        open_snackbar: true,
        snackbar_message: "Please select " + this.state.type + " number",
      });
      return false;
    }

    restClient(UPDATE, eventAction, {
      id: type_id,
      data: payload,
    }).then((response) => {
      this.setState({
        open_snackbar: true,
        snackbar_message: "Jobs copied successfully",
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
    console.log(job);
    const defaultJob =
      job.job_listing_id && job.description
        ? job.job_listing_id + " - " + job.description
        : "";

    return (
      <div key={jobIndex}>
        <AutoComplete
          floatingLabelText="Type the blank number"
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.jobs}
          name="job_listing_id"
          maxSearchResults={5}
          onUpdateInput={this.handleJobFieldSelectChange(jobIndex)}
          fullWidth={false}
          disabled={true}
          searchText={defaultJob}
        />
        &nbsp;&nbsp;
        {/* <TextField
          hintText="Hour Per Piece"
          floatingLabelText="Hour Per Piece"
          errorText=""
          disabled={true}
          name="hour_per_piece"
          onChange={this.handleJobFieldChange(jobIndex)}
          defaultValue={job.hour_per_piece}
        /> */}
        <RemoveJobButton onClick={this.handleRemoveJob(jobIndex)}>
          <DeleteIcon />
        </RemoveJobButton>
      </div>
    );
  };

  render() {
    console.log(this.props);
    const copy_jobs = this.state.item_blanks.map((blank, index) => ({
      description: blank.blank_description,
      job_listing_id: blank.blank_id,
      item_id: this.props.data.item_number,
      //   hour_per_piece: job.hour_per_piece,
      value: blank.blanks_listing_by_items,
    }));
    const defaultItem = this.props.data.item_number;
    this.state.copy_jobs = copy_jobs;
    console.log(this.state);

    const form = (
      <form onSubmit={this.submitForm}>
        <AutoComplete
          floatingLabelText={`Type the item number`}
          filter={AutoComplete.defaultFilter}
          dataSource={
            this.state.type === "blanks"
              ? stringHelpers.sortByLeadingNumber(this.state.items)
              : this.state.blanks
          }
          maxSearchResults={5}
          onUpdateInput={(item_description) => {
            if (this.state.type === "blank") {
              this.setState({
                item_number:
                  stringHelpers.extractLeadingNumber(item_description),
              });
            } else {
              this.setState({
                blank_number:
                  stringHelpers.extractLeadingNumber(item_description),
              });
            }
          }}
          defaultValue={0 || this.props.data.item_number}
          searchText={defaultItem}
          disabled={true}
          fullWidth={true}
        />
        <br />
        <br />
        {/* <AddJobButton
          label="Add Job"
          icon={<AddBoxIcon />}
          onTouchTap={this.handleAddNewJob}
          primary
        /> */}
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

    return <div> {form}</div>;
  }
}

export { EditBlankForm };
