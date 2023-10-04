import React from "react";
import FlatButton from "material-ui/FlatButton";

import NavigationRefresh from "material-ui/svg-icons/navigation/refresh";

import {
  List,
  Datagrid,
  CreateButton,
  EditButton,
  TextField,
} from "admin-on-rest/lib/mui";
import PriceField from "../../components/PriceField";
import { CardActions } from "material-ui/Card";

import { RawMaterialFilter } from "./RawMaterialFilter";
import { RawMaterialExportModal } from "./RawMaterialExportModal";

const cardActionStyle = {
  zIndex: 2,
  display: "inline-block",
  float: "right",
};
const RawMaterialListActions = ({
  resource,
  filters,
  displayedFilters,
  filterValues,
  basePath,
  showFilter,
  refresh,
}) => (
  <CardActions style={cardActionStyle}>
    {filters &&
      React.cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: "button",
      })}
    <CreateButton basePath={basePath} />
    <FlatButton
      primary
      label="Refresh"
      onClick={refresh}
      icon={<NavigationRefresh />}
    />
    <RawMaterialExportModal submitForm={() => 1} />
  </CardActions>
);
export const RawMaterialListing = (props) => (
  <List
    title="RawMaterial Listing"
    actions={<RawMaterialListActions />}
    filters={<RawMaterialFilter />}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="raw_material_type" label="Type" />
      <TextField source="vendor" />
      <PriceField source="cost" label="Cost ($)" />
      <TextField source="unit" />
      <TextField source="color" />
      <EditButton />
    </Datagrid>
  </List>
);
