import React from "react";
import { CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import NavigationRefresh from "material-ui/svg-icons/navigation/refresh";

import {
  Edit,
  ListButton,
  SimpleForm,
  DisabledInput,
  TextInput,
} from "admin-on-rest/lib/mui";
import { AddJobModal } from "../../components/AddJobModal";
import { CopyJobModal } from "../../components/CopyJobModal";
import JobTable from "../../components/JobTable";

const cardActionStyle = {
  zIndex: 2,
  display: "inline-block",
  float: "right",
};

const PostEditActions = ({ basePath, data, refresh }) => (
  <CardActions style={cardActionStyle}>
    <ListButton basePath={basePath} />
    <FlatButton
      primary
      label="Refresh"
      onClick={refresh}
      icon={<NavigationRefresh />}
    />
    {localStorage.getItem("role") === "admin" && (
      <AddJobModal data={data} type="blank" submitForm={() => 1} />
    )}
    {localStorage.getItem("role") === "admin" && (
      <CopyJobModal data={data} type="blank" submitForm={() => 1} />
    )}
  </CardActions>
);

export const BlankJobEdit = (props) => {
  console.log(props);
  return (
    <Edit title="" actions={<PostEditActions />} {...props}>
      <SimpleForm>
        <DisabledInput source="id" />
        <TextInput source="blank_number" label="Blank Number" />
        <TextInput source="description" label="Description" />
        <JobTable />
      </SimpleForm>
    </Edit>
  );
};
