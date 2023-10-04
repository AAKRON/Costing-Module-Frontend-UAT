import React from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {
  List,
  Datagrid,
  EditButton,
  TextField,
  CreateButton,
} from 'admin-on-rest/lib/mui';
import {
  Filter,
  TextInput,
  ChipField,
  ReferenceInput,
  SelectInput,
} from 'admin-on-rest/lib/mui';
import PriceField from '../../components/PriceField';
import { BlankExportModal } from './BlankExportModal';
import { NumberInput } from 'admin-on-rest/lib/mui/input';
const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};

const BlankFilter = (props) => (
  <Filter {...props}>
    <NumberInput
      label="Search by inventory cost"
      source="total_blank_cost_for_inventory"
    />
    <NumberInput
      label="Search by price cost"
      source="total_blank_cost_for_price"
    />
    <NumberInput label="Search by cost" source="cost" alwaysOn />
    <ReferenceInput
      label="Search by blank type"
      reference="blank_types"
      source="blank_type_id"
      perPage={0}
      alwaysOn
    >
      <SelectInput optionText="description" />
    </ReferenceInput>
    <TextInput label="Search by description" source="description" alwaysOn />
    <NumberInput
      label="Search by blank number"
      source="blank_number"
      alwaysOn
    />
  </Filter>
);

const BlankListActions = ({
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
        context: 'button',
      })}
    <CreateButton basePath={basePath} />
    <FlatButton
      primary
      label="Refresh"
      onClick={refresh}
      icon={<NavigationRefresh />}
    />
    <BlankExportModal submitForm={() => 1} />
  </CardActions>
);

export const BlankList = (props) => (
  <List
    title="All Blanks"
    actions={<BlankListActions />}
    sort={{ field: 'blank_number', order: 'ASC' }}
    filters={<BlankFilter />}
    perPage={100}
    {...props}
  >
    <Datagrid>
      <TextField source="blank_number" />
      <TextField source="description" />
      <ChipField source="blank_type" />
      <PriceField source="cost" label="Cost($)" />
      <PriceField source="total_blank_cost_for_price" label="Price Cost($)" />
      <PriceField
        source="total_blank_cost_for_inventory"
        label="Inventory Cost($)"
      />
      <EditButton />
    </Datagrid>
  </List>
);
