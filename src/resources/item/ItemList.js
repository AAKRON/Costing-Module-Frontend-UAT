import {
    ChipField,
    CreateButton,
    Datagrid,
    EditButton,
    List,
    TextField,
} from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import React from 'react';
import PriceField from '../../components/PriceField';
import { ItemExportModal } from './ItemExportModal';
import { ItemFilter } from './ItemFilter';

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};

const ItemListActions = ({
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
    <ItemExportModal submitForm={() => 1} />
  </CardActions>
);

export const ItemList = (props) => (
  <List
    title='All Items'
    actions={<ItemListActions />}
    sort={{ field: 'item_number', order: 'ASC' }}
    filters={<ItemFilter />}
    perPage={100}
    {...props}
  >
    <Datagrid>
      <TextField source='item_number' />
      <TextField source='description' />
      <ChipField source='type_description' label='Item Type' />
      <ChipField source='box_name' />
      <TextField source='number_of_pcs_per_box' label='Pcs/Box' />
      <PriceField source='ink_cost' label='Ink Cost($)' />
      <PriceField source='box_cost' label='Box Cost($)' />
      <PriceField source='total_price_cost' label='Price Cost($)' />
      <PriceField source='total_inventory_cost' label='Inventory Cost($)' />
      <EditButton />
    </Datagrid>
  </List>
);
