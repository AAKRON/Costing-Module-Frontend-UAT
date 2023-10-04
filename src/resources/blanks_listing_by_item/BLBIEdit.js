import React from "react";
import {
  Edit,
  ListButton,
  SimpleForm,
  DisabledInput,
  NumberInput,
} from "admin-on-rest/lib/mui";
import ListingItemCost from "../../components/ListingItemCost";
import { AddBlankModal } from "../../components/AddBlankModal";

import { CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import NavigationRefresh from "material-ui/svg-icons/navigation/refresh";

const cardActionStyle = {
  zIndex: 2,
  display: "inline-block",
  float: "right",
};
const BLBITitle = ({ record }) => {
  return <span>Blank List By Item #{record ? `${record.id}` : ""}</span>;
};

const PostEditActions = ({ basePath, data, refresh }) => {
  return (
    <CardActions style={cardActionStyle}>
      <ListButton basePath={basePath} />
      <FlatButton
        primary
        label="Refresh"
        onClick={refresh}
        icon={<NavigationRefresh />}
      />
      {localStorage.getItem("role") === "admin" && (
        <AddBlankModal
          data={data}
          type="blank"
          basePath={basePath}
          submitForm={() => 1}
        />
      )}
    </CardActions>
  );
};
export const BLBIEdit = (props) => {
  return (
    <Edit title={<BLBITitle />} actions={<PostEditActions />} {...props}>
      <SimpleForm toolbar={false}>
        <DisabledInput source="id" />
        <NumberInput source="item_number" />
        <ListingItemCost />
      </SimpleForm>
    </Edit>
  );
};
