import React from "react";
import {
  List,
  Datagrid,
  CreateButton,
  EditButton,
  TextField,
  Filter,
  TextInput,
} from "admin-on-rest/lib/mui";
import PriceField from "../../components/PriceField";
import FlatButton from "material-ui/FlatButton";
import { CardActions } from "material-ui/Card";

import NavigationRefresh from "material-ui/svg-icons/navigation/refresh";
import { ColorExportModal } from "./ColorExportModal";
import { NumberInput } from "admin-on-rest/lib/mui/input";

const cardActionStyle = {
  zIndex: 2,
  display: "inline-block",
  float: "right",
};
const ColorListActions = ({
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
    <ColorExportModal submitForm={() => 1} />
  </CardActions>
);
const FilterSearch = (props) => (
  <Filter {...props}>
    <NumberInput label="Search by color cost" source="cost_of_color" alwaysOn />
    <TextInput label="Search by color name" source="name" alwaysOn />
    <TextInput label="Search by color code" source="code" alwaysOn />
  </Filter>
);

export const ColorList = (props) => (
  <List
    title="All Colors"
    actions={<ColorListActions />}
    sort={{ field: "id", order: "ASC" }}
    filters={<FilterSearch />}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="code" />
      <TextField source="name" />
      <PriceField source="cost_of_color" label="Cost ($)" />
      <EditButton />
    </Datagrid>
  </List>
);
