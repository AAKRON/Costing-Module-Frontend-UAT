import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import AddIcon from "material-ui/svg-icons/content/add";
import { AddBlankForm } from "./AddBlankForm";

class AddBlankModal extends React.Component {
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
          this.refs.copy_blank_form.submit(this.handleClose);
        }}
      />,
    ];

    return (
      <span>
        <FlatButton
          primary
          label="Add Blank"
          onTouchTap={this.handleOpen}
          icon={<AddIcon />}
        />
        <Dialog
          title={`Add blanks to item`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <AddBlankForm
            data={this.props.data}
            type={this.props.type}
            path={this.props.basePath}
            ref="copy_blank_form"
          />
        </Dialog>
      </span>
    );
  }
}

export { AddBlankModal };
