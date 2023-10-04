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
import { RawMaterialTypeExportModal } from './RawMaterialTypeExportModal';

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};
const RawMaterialTypeListActions = ({
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
    <RawMaterialTypeExportModal submitForm={() => 1} />
  </CardActions>
);
const FilterSearch = (props) => (
  <Filter {...props}>
    <TextInput label='Search by name' source='q' alwaysOn />
  </Filter>
);

export const RawMaterialTypeList = (props) => (
  <List
    title='Raw Material Types'
    actions={<RawMaterialTypeListActions />}
    sort={{ field: 'id', order: 'ASC' }}
    filters={<FilterSearch />}
    {...props}
  >
    <Datagrid>
      <TextField source='id' />
      <TextField source='name' />
      <EditButton />
    </Datagrid>
  </List>
);
