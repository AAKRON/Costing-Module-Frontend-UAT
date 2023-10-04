/* eslint-disable */
import { GET_LIST, UPDATE } from 'admin-on-rest';
import axios from 'axios';
import lodash from 'lodash';
import AutoComplete from 'material-ui/AutoComplete';
import AddButton from 'material-ui/FlatButton';
import RemoveButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import AddBoxIcon from 'material-ui/svg-icons/content/add-box';
import React from 'react';
import { stringHelpers } from '../helpers/stringHelpers';
import restClient from '../restClient';

class AddBlankForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item_number: '',
      copy_blanks: [],
      done: false,
      errors: {},
      loading: false,
      open_snackbar: false,
      snackbar_message: '',
      blanks: [],
    };
  }

  fetchBlanks = () =>
    restClient(GET_LIST, 'blank-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    });

  handleSnackbarClose = () =>
    this.setState({ open_snackbar: false, snackbar_message: '' });

  componentDidMount() {
    axios.all([this.fetchBlanks()]).then(
      axios.spread((blank) => {
        const blanks = blank.data.map(
          (blank) => `${blank.blank_number} - ${blank.description}`
        );
        this.setState({
          blanks: blanks,
          item_number: this.props.data.item_number,
        });
      })
    );
  }

  handleAddNewBlank = () => {
    this.setState({
      copy_blanks: this.state.copy_blanks.concat([
        { blank_number: '', mult: 1, div: 1 },
      ]),
    });
  };

  handleRemoveBlank = (index) => () => {
    this.setState({
      copy_blanks: this.state.copy_blanks.filter(
        (blank, index) => index !== index
      ),
    });
  };

  handleBlankFieldChange = (index) => (event, value) => {
    const newBlank = this.state.copy_blanks.map((blank, index) => {
      if (index !== index) return blank;
      return { ...blank, [event.target.name]: value };
    });

    this.setState({ copy_blanks: newBlank });
  };

  handleBlankFieldSelectChange = (index) => (value) => {
    const newBlank = this.state.copy_blanks.map((blank, index) => {
      if (index !== index) return blank;
      value = stringHelpers.extractLeadingNumber(value);
      blank.blank_number = value;
      return { ...blank, value };
    });

    this.setState({ copy_blanks: newBlank });
  };

  submit = (dialogClose) => {
    const payload = lodash.pick(this.state, ['item_number', 'copy_blanks', 'mult', 'div']);

    var item_blanks = {
      blanks: payload.copy_blanks.map((blank) => ({
        blank_number: blank.value.toString(),
        mult: blank.multiplication || '1',
        div: blank.division || '1',
      })),
    };

    restClient(UPDATE, 'update-item-blanks-only', {
      id: payload.item_number,
      data: item_blanks,
    }).then((response) => {
      this.setState({
        open_snackbar: true,
        snackbar_message: 'Blanks added successfully',
      });

      window.location.reload();

      setTimeout(() => {
        dialogClose();
      }, 700);
    });
  };

  blankField = (blank, index) => {
    const defaultBlank =
      blank.blank_number && blank.description
        ? blank.blank_number + ' - ' + blank.description
        : '';
    return (
      <div key={index}>
        <AutoComplete
          floatingLabelText='Type the blank number'
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.blanks}
          name='blank_number'
          maxSearchResults={5}
          onUpdateInput={this.handleBlankFieldSelectChange(index)}
          fullWidth={false}
          searchText={defaultBlank}
        />
        &nbsp;&nbsp;
        <TextField
          hintText='Multiplication'
          floatingLabelText='Multiplication'
          errorText=''
          name='multiplication'
          onChange={this.handleBlankFieldChange(index)}
          defaultValue={'1'}
          style={{ width: '100px' }}
        />
        <TextField
          hintText='Division'
          floatingLabelText='Division'
          errorText=''
          name='division'
          onChange={this.handleBlankFieldChange(index)}
          defaultValue={'1'}
          style={{ width: '100px' }}
        />
        <RemoveButton onClick={this.handleRemoveBlank(index)}>
          <DeleteIcon />
        </RemoveButton>
      </div>
    );
  };

  render() {
    const form = (
      <form onSubmit={this.submitForm}>
        <TextField
          hintText='Item Number'
          floatingLabelText='Item Number'
          name='item_number'
          disabled={true}
          value={this.state.item_number}
        />
        <br />
        <br />
        <AddButton
          label='Add Blank'
          icon={<AddBoxIcon />}
          onTouchTap={this.handleAddNewBlank}
          primary
        />
        <br />
        <br />
        {this.state.copy_blanks.map(this.blankField)}

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

export { AddBlankForm };
