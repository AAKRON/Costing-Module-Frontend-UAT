import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
// import CopyJob from "material-ui/svg-icons/content/content-copy";
import AddIcon from "material-ui/svg-icons/content/add";

import { AddJobForm } from "./AddJobForm";
/*const styles = {
    radioButton: {
        marginTop: 16,
    },
};*/

class AddJobModal extends React.Component {
  state = { open: false };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Add Over"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {
          this.refs.copy_job_form.submit(this.handleClose);
        }}
      />,
    ];

    return (
      <span>
        <FlatButton
          primary
          label="Add Job"
          onTouchTap={this.handleOpen}
          icon={<AddIcon />}
        />
        <Dialog
          title={`Add jobs to ${this.props.type}`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <AddJobForm
            data={this.props.data}
            type={this.props.type}
            ref="copy_job_form"
          />
        </Dialog>
      </span>
    );
  }
}

export { AddJobModal };
