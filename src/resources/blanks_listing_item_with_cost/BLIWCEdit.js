import React from "react";

import ListingItemCost from "../../components/ListingItemCost";

import { CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import NavigationRefresh from "material-ui/svg-icons/navigation/refresh";

import {
  Edit,
  ListButton,
  SimpleForm,
  DisabledInput,
  NumberInput,
} from "admin-on-rest/lib/mui";
import { AddBlankModal } from "../../components/AddBlankModal";

const cardActionStyle = {
  zIndex: 2,
  display: "inline-block",
  float: "right",
};
const BLIWCTitle = ({ record }) => {
  return <span>Blank List Item With Cost #{record ? `${record.id}` : ""}</span>;
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
      <AddBlankModal data={data} type="blank" submitForm={() => 1} />
    )}
  </CardActions>
);
const BLIWCEdit = (props) => (
  <Edit title={<BLIWCTitle />} actions={<PostEditActions />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <NumberInput source="item_number" />
      <ListingItemCost />
    </SimpleForm>
  </Edit>
);

export { BLIWCEdit };
