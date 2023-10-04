import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import CopyJob from "material-ui/svg-icons/content/content-copy";
import { EditBlankForm } from "./EditBlankForm";
/*const styles = {
    radioButton: {
        marginTop: 16,
    },
};*/

class EditBlankModal extends React.Component {
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
        label="Edit Blanks"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {
          this.refs.copy_blanks_form.submit(this.handleClose);
        }}
      />,
    ];

    return (
      <span>
        <FlatButton
          primary
          label="Edit Blanks"
          onTouchTap={this.handleOpen}
          icon={<CopyJob />}
        />
        <Dialog
          title={`Edit blanks in item`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <EditBlankForm
            data={this.props.data}
            type={this.props.type}
            path={this.props.basePath}
            ref="copy_blanks_form"
          />
        </Dialog>
      </span>
    );
  }
}

export { EditBlankModal };
