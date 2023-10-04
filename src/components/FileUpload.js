import {
    Button,
    Card,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
    Snackbar,
    TextField,
} from '@mui/material'
import axios from 'axios'
import React from 'react'
import { SERVER_URL } from '../config'

// const UPLOAD_PATH = `${SERVER_URL}/items-and-blanks-listings`;
const VALID_FILE_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
const REDIRECT_PATH = {
  jobs_and_blanks: '#/job_listings',
  raw_materials: '#/raw_materials',
  blanks_listing_item_with_cost: '#/blanks_listing_item_with_costs',
  blanks_listing_by_item: '#/blanks_listing_by_items',
  box_list_for_costing_module: '#/boxes',
  item_list_for_costing_module: '#/items',
  screen_cliche_sizes_for_costing_module: '#/screens',
  blanks_report: '#/blanks',
  item_listing_with_item_types: '#items',
}

const UPLOAD_PATHS = {
  jobs_and_blanks: '/job_listing_dashboard',
  raw_materials: '/raw_materials_dashboard',
  blanks_listing_item_with_cost: '/blanks_listing_item_with_cost_dashboard',
  blanks_listing_by_item: '/blanks_listing_by_item_dashboard',
  box_list_for_costing_module: '/box_list_for_costing_module',
  item_list_for_costing_module: '/item_list_for_costing_module_dashboard',
  screen_cliche_sizes_for_costing_module:
    '/screen_cliche_sizes_for_costing_module_dashboard',
  blanks_report: '/blanks_report_dashboard',
  item_listing_with_item_types: '/item_listing_with_item_types_dashboard',
}

export class FileUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      open_login: false,
      open_snackbar: false,
      snackbar_message: '',
      document_type: '',
      loading: false,
      selectedDatabase: '',
      confirmPassword: '',
    }
  }

  handleDatabaseChange = (e) => this.setState({ selectedDatabase: e.target.value })

  handleFileChange = (e) => this.setState({ file: e.target.files[0] })

  handleSnackbarClose = () =>
    this.setState({ open_snackbar: false, snackbar_message: '', file: null });

  handleUpload = (e) => {
    const UPLOAD_PATH = UPLOAD_PATHS[this.state.document_type];
    // const UPLOAD_PATH =
    //   this.state.document_type === 'box_list_for_costing_module'
    //     ? `${SERVER_URL}/${this.state.document_type}`
    //     : this.state.document_type === 'raw_materials'
    //     ? `${SERVER_URL}/${this.state.document_type}_dashboard`
    //     : `${SERVER_URL}/items-and-blanks-listings`;

    e.preventDefault();
    const { file, document_type } = this.state;
    console.log(UPLOAD_PATH);
    if (!file) {
      this.setState({
        open_snackbar: true,
        snackbar_message: 'Please upload a file',
      });
      return false;
    }

    if (file.type !== VALID_FILE_TYPE && file.type !== 'text/csv') {
      this.setState({
        open_snackbar: true,
        snackbar_message: 'Please upload a valid spreadsheet',
      });
      return false;
    }

    if (!document_type) {
      this.setState({
        open_snackbar: true,
        snackbar_message: 'Please select a type',
      });
      return false;
    }

    const formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('document_type', this.state.document_type);

    // axios.post(UPLOAD_PATH, formData).then((response) => {
    this.setState({ loading: true });
    axios.post(`${SERVER_URL}${UPLOAD_PATH}`, formData).then((response) => {
      this.setState({
        open_snackbar: true,
        snackbar_message: response.data.message,
      });
      this.setState({ loading: false });
      setTimeout(() => {
        location.replace(REDIRECT_PATH[this.state.document_type]);
      }, 500);
    });
  };

  handleDownload = (e) => {
    e.preventDefault();
    const { document_type } = this.state;
    console.log(document_type);
    if (!document_type) {
      this.setState({
        open_snackbar: true,
        snackbar_message: 'Please select a type',
      });
      return false;
    }

    // const newPath = document_type.replace(/_/g, '-');
    // console.log(newPath);
    console.log(document_type + '_download');

    // if (
    //   typeof this.state.document_type !== 'undefined' &&
    //   document_type === 'raw_materials'
    // ) {
    //   return window.open(
    //     `${SERVER_URL}/${document_type}_download/${this.state.document_type}.xlsx`,
    //     '_blank'
    //   );
    // }

    // if (
    //   typeof this.state.document_type !== 'undefined' &&
    //   document_type === 'box_list_for_costing_module'
    // ) {
    //   return window.open(
    //     `${SERVER_URL}/${document_type}_download/${this.state.document_type}.xlsx`
    //   );
    // }
    // if (typeof this.state.document_type !== 'undefined') {
    //   return window.open(
    //     `${SERVER_URL}/download/${this.state.document_type}`,
    //     '_blank'
    //   );
    // }
    if (typeof this.state.document_type !== 'undefined') {
      return window.open(
        `${SERVER_URL}/${document_type}_download/${this.state.document_type}.xlsx`,
        '_blank'
      );
    }
  };

  handleConfirmDatabase = (e) => {
    e.preventDefault()
    this.setState({ open_login: true })
  }

  handleConfirmAuth = (e) => {
    e.preventDefault()

    const callback = () => {
      const db = this.state.selectedDatabase
      localStorage.setItem('db', db)
      this.setState({ open_login: false })
      this.setState({ confirmPassword: '' })
    }
  
    this.props.validatePassword(this.state.confirmPassword, callback)
  }
  
  handleDialogClose = () => this.setState({ open_login: false })

  componentDidMount() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `;
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  render() {
    const spinnerStyle = {
      border: '4px solid rgba(0, 0, 0, 0.1)',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      borderTopColor: '#00BCD4',
      animation: 'spin 1s infinite linear',
      margin: 'auto',
    };

    return (
      <div>
        <div>
          <h2 style={{ margin: '0'}}>
            Current Database: {localStorage.getItem('db') || '2023'}
          </h2>

          <FormControl style={{ width: '100%', maxWidth: '500px'}}>
            <InputLabel
              id='titleDb'
            >
              Select Database
            </InputLabel>
            <Select
              labelId='titleDb'
              value={this.state.selectedDatabase}
              onChange={this.handleDatabaseChange}
            >
              <MenuItem value={'2020'}>2020</MenuItem>
              <MenuItem value={'2021'}>2021</MenuItem>
              <MenuItem value={'2022'}>2022</MenuItem>
              <MenuItem value={'2023'}>2023</MenuItem>
            </Select>

            {this.state.selectedDatabase !== '' && (
              <Button
                variant='contained'
                onClick={this.handleConfirmDatabase}
                style={{ marginTop: '1rem' }}
              >
                Confirm Database
              </Button>
            )}

            <Modal
              open={this.state.open_login}
              onClose={this.handleDialogClose}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Card style={{ padding: '1rem' }}>
                <h3>
                  Confirm Authentication for Database: {this.state.selectedDatabase}
                </h3>

                <FormControl fullWidth>
                  <TextField
                    label='Password'
                    variant='outlined'
                    type='password'
                    value={this.state.confirmPassword}
                    onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                  />
                  <Button
                    variant='contained'
                    onClick={this.handleConfirmAuth}
                    color='success'
                  >
                    Confirm
                  </Button>
                </FormControl>
              </Card>
            </Modal>
          </FormControl>
        </div>

        <h2>Please import a spreadsheet with the same name below:</h2>
        <div style={{ marginBottom: 25 }}>
          <input
            type='file'
            onChange={this.handleFileChange}
            accept='.xls, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
          />
        </div>

        <FormControl fullWidth>
          <RadioGroup
            name='shipSpeed'
            defaultSelected='not_light'
            onChange={(e, value) => this.setState({ document_type: value })}
          >
            <FormControlLabel value='jobs_and_blanks' control={<Radio />} label='JOB LIST' />
            <FormControlLabel value='raw_materials' control={<Radio />} label='MATERIALS' />
            <FormControlLabel value='blanks_listing_item_with_cost' control={<Radio />} label='BLANKS LISTING ITEM WITH COST' />
            <FormControlLabel value='blanks_listing_by_item' control={<Radio />} label='BLANKS LISTING BY ITEM' />
            <FormControlLabel value='box_list_for_costing_module' control={<Radio />} label='BOX LIST' />
            <FormControlLabel value='item_list_for_costing_module' control={<Radio />} label='ITEM LIST' />
            <FormControlLabel value='screen_cliche_sizes_for_costing_module' control={<Radio />} label='SCREEN-CLICHE SIZES' />
            <FormControlLabel value='blanks_report' control={<Radio />} label='BLANKS' />
            <FormControlLabel value='item_listing_with_item_types' control={<Radio />} label='ITEM LIST WITH ITEM TYPES' />
          </RadioGroup>
        </FormControl>

        <Button
          variant='contained'
          onClick={this.handleUpload}
          color='primary'
        >
          Upload File
        </Button>

        <Button
          variant='contained'
          onClick={this.handleDownload}
          color='warning'
          style={{ marginLeft: '1rem' }}
        >
          Download File
        </Button>

        {this.state.loading && <div style={spinnerStyle} />}

        <Snackbar
          open={this.state.open_snackbar}
          message={this.state.snackbar_message}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
          onClick={this.handleSnackbarClose}
        />
      </div> 
    );
  }
}
