import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import React from 'react';

import {
    CreateButton,
    Datagrid,
    EditButton,
    Filter,
    List,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';
// import PriceField from '../../components/PriceField';
import { CardActions } from 'material-ui/Card';

// import { RawMaterialFilter } from './RawMaterialFilter';
import { VendorExportModal } from './VendorExportModal';

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};
const VendorListActions = ({
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
      label='Refresh'
      onClick={refresh}
      icon={<NavigationRefresh />}
    />
    <VendorExportModal submitForm={() => 1} />
  </CardActions>
);
const FilterSearch = (props) => (
  <Filter {...props}>
    <TextInput label='Search by vendor code ' source='code' alwaysOn />
    <TextInput label='Search by vendor name ' source='name' alwaysOn />
  </Filter>
);

export const VendorList = (props) => (
  <List
    title='All Vendors'
    sort={{ field: 'id', order: 'ASC' }}
    actions={<VendorListActions />}
    filters={<FilterSearch />}
    {...props}
  >
    <Datagrid>
      <TextField source='id' />
      <TextField source='name' />
      <TextField source='code' />
      <EditButton />
    </Datagrid>
  </List>
);
