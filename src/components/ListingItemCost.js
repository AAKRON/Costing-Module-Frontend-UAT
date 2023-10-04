/* eslint-disable */
import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import RemoveButton from "material-ui/IconButton";
import Button from "material-ui/IconButton";
import EditIcon from "material-ui/svg-icons/content/create";
import DeleteIcon from "material-ui/svg-icons/action/delete-forever";
import { GET_ONE, GET_LIST, UPDATE } from "admin-on-rest";
import restClient from "../restClient";
import axios from "axios";
import FlatButton from "material-ui/FlatButton";
import * as _ from "lodash";
import Dialog from "material-ui/Dialog";
import AutoComplete from "material-ui/AutoComplete";
import TextField from "material-ui/TextField";

export default class ListingItemCost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
      item_blanks: [],
      tableBodyRenderKey: 0,
      editableBlank: {blank_number: -1, mult:1, div: 1},
      editIndex: -1,
      open: false,
      blanks: [],
    };
  }
  fetchBlankListByItem = () =>
    restClient(GET_ONE, `blanks_listing_by_items`, {
      id: this.props.record.id,
    });

  fecthBLIWC = () =>
    restClient(GET_ONE, `blanks_listing_item_with_costs`, {
      id: this.props.record.id,
    });

  fetchBlanks = () =>
    restClient(GET_LIST, "blank-list-only", {
      pagination: { page: 1, perPage: -1 },
      sort: { field: "id", order: "ASC" },
    });

  componentDidMount() {
    axios
      .all([
        this.props.resource === "blanks_listing_by_items"
          ? this.fetchBlankListByItem()
          : this.fecthBLIWC(),
        this.fetchBlanks(),
      ])
      .then(
        axios.spread((item, blank) => {
          const item_blanks = item.data.blanks_listing_by_item;

          const blanks = blank.data.map(
            (blank) => `${blank.blank_number} - ${blank.description}`
          );
          this.setState({ item, item_blanks, blanks });
        })
      );
  }

  handleRemoveBlank = (blankIndex) => () => {
    this.state.item_blanks[blankIndex].deleted = true;
    this.setState({
      item_blanks: this.state.item_blanks,
      tableBodyRenderKey: this.state.tableBodyRenderKey + 1,
      open: false,
    });
  };

  handleEditBlank = async () => {
    const { editIndex, editableBlank } = this.state;

    const tempBlank = this.state.item_blanks;
    tempBlank[editIndex] = { ...editableBlank, selected: false };

    this.setState({
      tableBodyRenderKey: this.state.tableBodyRenderKey + 1,
      open: false,
    });

    restClient(UPDATE, "update-item-blanks-data", {
      id: this.state.item.data.item_id,
      data: editableBlank,
    }).then((response) => {
      this.setState({
        open_snackbar: true,
        snackbar_message: "Item blank updated successfully",
      });

      setTimeout(() => {
        window.location.reload();
      }, 700);
    });
  }

  handleBlankFieldChange = () => (event, value) => {
    this.setState({
      editableBlank: {
        ...this.state.editableBlank,
        [event.target.name]: value,
      },
    });
  };

  hadleAutoComplete = () => (data) => {
    const value = data.split(" - ");
    this.setState({
      editableBlank: {
        ...this.state.editableBlank,
        blank_number: Number(value[0]),
      },
    });
  };

  toggleDialog = (index) => () => {
    this.setState({
      open: true,
      editableBlank: this.state.item_blanks[index],
      editIndex: index,
    });
  };

  blankField = (blank, index) => {
    if(blank.deleted){
      return;
    }
    return (
      <TableRow key={index} selected={blank.selected}>
        <TableRowColumn>{blank.blank_number}</TableRowColumn>
        <TableRowColumn>{blank.blank_description || "-"}</TableRowColumn>
        <TableRowColumn>{blank.mult == null ? 1 : blank.mult}</TableRowColumn>
        <TableRowColumn>{blank.div == null ? 1 : blank.div}</TableRowColumn>
        <TableRowColumn>
          <Button onClick={this.toggleDialog(index)}>
            <EditIcon />
          </Button>
        </TableRowColumn>
        <TableRowColumn>
          <RemoveButton onClick={this.handleRemoveBlank(index, blank)}>
            <DeleteIcon />
          </RemoveButton>
        </TableRowColumn>
      </TableRow>
    );
  };

  render() {
    const { editableBlank } = this.state;
    const defaultBlank = (editableBlank.blank_number && editableBlank.blank_description) ? editableBlank.blank_number + " - " + editableBlank.blank_description : "";
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.setState({ open: false })}
      />,
      <FlatButton
        label="Update"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {
          this.handleEditBlank();
        }}
      />,
    ];

    if (
      Array.isArray(this.state.item_blanks) &&
      this.state.item_blanks.length > 0
    ) {
      return (
        <div>
          <h2>Blanks By Item</h2>
          <Dialog
            title="Edit Blank"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={() => this.setState({ open: false })}
            autoScrollBodyContent={true}
          >
            <AutoComplete
              floatingLabelText="Type the blank number"
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.state.blanks}
              name="blank_number"
              maxSearchResults={5}
              onUpdateInput={this.hadleAutoComplete()}
              fullWidth={false}
              searchText={defaultBlank}
            />
            &nbsp;&nbsp;
            <TextField
              hintText="Multiplication"
              floatingLabelText="Multiplication"
              errorText=""
              name="mult"
              onChange={this.handleBlankFieldChange()}
              value={this.state.editableBlank.mult}
              style={{ width: "100px" }}
            />
            <TextField
              hintText="Division"
              floatingLabelText="Division"
              errorText=""
              name="div"
              onChange={this.handleBlankFieldChange()}
              value={this.state.editableBlank.div}
              style={{ width: "100px" }}
            />
          </Dialog>

          <Table multiSelectable={false}>
            <TableHeader enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Blank#</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn>Multiplication</TableHeaderColumn>
                <TableHeaderColumn>Division</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              deselectOnClickaway={false}
              showRowHover={true}
              key={this.state.tableBodyRenderKey}
            >
              {this.state.item_blanks.map(this.blankField)}
            </TableBody>
          </Table>
        </div>
      );
    }

    return (
      <div>
        <br />
        <br />
        Loading
      </div>
    );
  }
}
