import React from "react";
import {
  EditButton,
  Filter,
  List,
  Datagrid,
  TextField,
  TextInput,
  CreateButton,
} from "admin-on-rest/lib/mui";
// import PriceField from "../../components/PriceField";
import { CardActions } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import NavigationRefresh from "material-ui/svg-icons/navigation/refresh";

// import { RawMaterialFilter } from "./RawMaterialFilter";
import { UnitsExportModal } from "./UnitsExportModal";
const cardActionStyle = {
  zIndex: 2,
  display: "inline-block",
  float: "right",
};
const UnitsListActions = ({
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
    <UnitsExportModal submitForm={() => 1} />
  </CardActions>
);

const FilterSearch = (props) => (
  <Filter {...props}>
    <TextInput label="Search by unit abbreviation" source="abbr" alwaysOn />
    <TextInput label="Search by unit name" source="name" alwaysOn />
  </Filter>
);
export const UnitsOfMeasureList = (props) => (
  <List
    title="Units Of Measures"
    actions={<UnitsListActions />}
    sort={{ field: "id", order: "ASC" }}
    filters={<FilterSearch />}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="abbr" />
      <EditButton />
    </Datagrid>
  </List>
);
