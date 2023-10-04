import { Datagrid, EditButton, Filter, List, TextField, TextInput } from 'admin-on-rest/lib/mui';
import React from 'react';
import PriceField from '../../components/PriceField';

const BLIWCListingFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search by item number' source='q' alwaysOn />
  </Filter>
);

export const BLIWCListing = (props) => (
  <List
    title='Blanks Listing Item with Cost'
    sort={{ field: 'item_number', order: 'ASC' }}
    filters={<BLIWCListingFilter />}
    perPage={200}
    {...props}
  >
    <Datagrid>
      <TextField source='item_number' />
      <TextField source='blank_number' />
      <PriceField source='cost' label='Cost Per Blank($)' />
      <PriceField
        source='total_blank_cost_for_price'
        label='Price Cost Per Blank($)'
      />
      <PriceField
        source='total_blank_cost_for_inventory'
        label='Inventory Cost Per Blank($)'
      />
      <EditButton />
    </Datagrid>
  </List>
);
