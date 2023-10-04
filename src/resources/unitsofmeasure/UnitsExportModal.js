import axios from 'axios';
import React from 'react';
// import lodash from 'lodash';
import {
    GET_LIST,
} from 'admin-on-rest';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import { SERVER_URL } from '../../config';
import { stringHelpers } from '../../helpers/stringHelpers';
import restClient from '../../restClient';

const styles = {
  RaisedButton: {
    FirstButton: {
      marginTop: '30px',
      marginBottom: '10px',
    },
    SecondButton: {
      marginLeft: '30px',
      marginTop: '30px',
      marginBottom: '10px',
    },
  },
  CenterAlgin: {
    textAlign: 'center',
  },
  Blank: {
    margin: 4,
  },
  Wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '10px',
  },
};

class UnitsExportModal extends React.Component {
  state = { open: false, blanks: [], seleted_blanks: [], searchText: '' };

  fetchRawMaterials = () =>
    restClient(GET_LIST, 'units-of-measure-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
      // filter: { type_id: 1 },
    });

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  componentDidMount() {
    axios.all([this.fetchRawMaterials()]).then(
      axios.spread((raw) => {
        console.log(raw);
        const blanks = raw.data.map(
          (raw) => `${raw.id} - ${raw.name} - ${raw.abbr}`
        );
        this.setState({ blanks });
      })
    );
  }

  handleBlankPriceCostDownload = (e) => {
    e.preventDefault();

    window.open(`${SERVER_URL}/units-download/listing-units.csv`, '_blank');
  };

  handleBlankInventoryCostDownload = (e) => {
    e.preventDefault();

    window.open(`${SERVER_URL}/units-download/listing-units.csv`, '_blank');
  };

  handleSeletedBlankPriceCostDownload = (e) => {
    e.preventDefault();

    window.open(
      `${SERVER_URL}/units-download/listing-units.csv?blanks=${this.state.seleted_blanks.toString()}`,
      '_blank'
    );
  };

  handleSeletedBlankInventoryCostDownload = (e) => {
    e.preventDefault();

    window.open(
      `${SERVER_URL}/units-download/listing-units.csv?blanks=${this.state.seleted_blanks.toString()}`,
      '_blank'
    );
  };

  handleRequestDelete = (seleted_blank_index) => {
    this.setState({
      seleted_blanks: this.state.seleted_blanks.filter(
        (blank, index) => seleted_blank_index !== index
      ),
    });
  };

  renderBlanksChip(blank, index) {
    return (
      <Chip
        key={blank}
        onRequestDelete={() => this.handleRequestDelete(index)}
        style={styles.Blank}
      >
        {blank}
      </Chip>
    );
  }

  render() {
    console.log(this.state.blanks);
    return (
      <span>
        <FlatButton
          primary
          label='Export Units of Measures'
          onTouchTap={this.handleOpen}
          icon={<FileFileDownload />}
        />
        <Dialog
          title='Export Units of Measures List'
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div style={styles.CenterAlgin}>
            <h2>Export Units of Measure</h2>
            <RaisedButton
              style={styles.RaisedButton.FirstButton}
              label='Units of Measures Listing'
              secondary={true}
              onTouchTap={this.handleOpen}
              icon={<FileFileDownload />}
              onClick={this.handleBlankPriceCostDownload}
            />

            {/* <RaisedButton
              style={styles.RaisedButton.SecondButton}
              label='Inventory Cost Blanks'
              secondary={true}
              onTouchTap={this.handleOpen}
              icon={<FileFileDownload />}
              onClick={this.handleBlankInventoryCostDownload}
            /> */}
            <Divider />

            <h2 style={{ marginBottom: 0 }}>
              Export Selected Units of Measures
            </h2>
            <AutoComplete
              floatingLabelText={`Type the unit of measures name`}
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.state.blanks}
              maxSearchResults={5}
              onNewRequest={(blank_description) => {
                var seleted_blanks = this.state.seleted_blanks;
                var blanks_number =
                  stringHelpers.extractLeadingNumber(blank_description);
                console.log(blanks_number);
                this.setState({ searchText: blank_description });

                if (seleted_blanks.indexOf(blanks_number) === -1) {
                  seleted_blanks.push(blanks_number);
                }

                this.setState({
                  seleted_blanks: seleted_blanks,
                  searchText: '',
                });
              }}
              fullWidth={true}
              searchText={this.state.searchText}
            />
            <h4 style={{ textAlign: 'left', margin: '5px 0' }}>
              Selected Unit of Measures:
            </h4>
            <div style={styles.Wrapper}>
              {this.state.seleted_blanks.map(this.renderBlanksChip, this)}
            </div>
            {this.state.seleted_blanks.length > 0 && (
              <RaisedButton
                style={styles.RaisedButton.FirstButton}
                label='Export Selected Units of Measures'
                primary={true}
                onTouchTap={this.handleOpen}
                icon={<FileFileDownload />}
                onClick={this.handleSeletedBlankPriceCostDownload}
              />
            )}
            {/* {this.state.seleted_blanks.length > 0 && (
              <RaisedButton
                style={styles.RaisedButton.SecondButton}
                label='Inventory Cost Blanks'
                primary={true}
                onTouchTap={this.handleOpen}
                icon={<FileFileDownload />}
                onClick={this.handleSeletedBlankInventoryCostDownload}
              />
            )} */}
          </div>
        </Dialog>
      </span>
    );
  }
}

export { UnitsExportModal };
