import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { Datagrid, EditButton, Filter, FunctionField, List, TextField, TextInput, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

const BLIWCListingFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search by item number' source='q' alwaysOn />
  </Filter>
)

const Actions = ({
  filters,
  displayedFilters,
  filterValues,
  resource,
  showFilter,
}) => (
  <TopToolbar>
    {filters &&
      React.cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: 'button',
      })}
  </TopToolbar>
)

export const BLIWCListing = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      actions={<Actions />}
      title='Blanks Listing Item with Cost'
      sort={{ field: 'item_number', order: 'ASC' }}
      filters={<BLIWCListingFilter />}
      perPage={50}
      {...props}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        <TextField source='item_number' />
        <TextField source='blank_number' />
        <FunctionField
          source='cost'
          label='Cost Per Blank($)'
          render={
            record => {
              return <span>${record.cost}</span>
          }}
        />
        <FunctionField
          source='total_blank_cost_for_price'
          label='Price Cost Per Blank($)'
          render={
            record => {
              return <span>${record.total_blank_cost_for_price}</span>
          }}
        />
        <FunctionField
          source='total_blank_cost_for_inventory'
          label='Inventory Cost Per Blank($)'
          render={
            record => {
              return <span>${record.total_blank_cost_for_inventory}</span>
          }}
        />

        <EditButton
          label={isModifyPermission() ? 'Edit' : 'View'}
          icon={isModifyPermission() ? <EditIcon /> : <ShowIcon />}
        />
      </Datagrid>
    </List>
  </Card>
)
