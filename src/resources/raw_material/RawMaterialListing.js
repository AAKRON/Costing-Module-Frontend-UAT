import FlatButton from 'material-ui/FlatButton';
import React from 'react';

import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';

import {
    CreateButton,
    Datagrid,
    EditButton,
    List,
    TextField,
} from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import PriceField from '../../components/PriceField';

import { RawMaterialExportModal } from './RawMaterialExportModal';
import { RawMaterialFilter } from './RawMaterialFilter';

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
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
        context: 'button',
      })}
    <CreateButton basePath={basePath} />
    <FlatButton
      primary
      label='Refresh'
      onClick={refresh}
      icon={<NavigationRefresh />}
    />
    <RawMaterialExportModal submitForm={() => 1} />
  </CardActions>
);
export const RawMaterialListing = (props) => (
  <List
    title='RawMaterial Listing'
    actions={<RawMaterialListActions />}
    filters={<RawMaterialFilter />}
    {...props}
  >
    <Datagrid>
      <TextField source='id' />
      <TextField source='name' />
      <TextField source='raw_material_type' label='Type' />
      <TextField source='vendor' />
      <PriceField source='cost' label='Cost ($)' />
      <TextField source='unit' />
      <TextField source='color' />
      <EditButton />
    </Datagrid>
  </List>
);
