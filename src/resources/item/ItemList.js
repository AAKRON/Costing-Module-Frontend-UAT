import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { ChipField, CreateButton, Datagrid, EditButton, FunctionField, List, TextField, TopToolbar } from 'react-admin'
import { isModifyPermission, roundNumber } from '../../helpers/functions'
import { ItemFilter } from './ItemFilter'

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

    {isModifyPermission() && <CreateButton />}
  </TopToolbar>
)

export const ItemList = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='All Items'
      actions={<Actions />}
      sort={{ field: 'item_number', order: 'ASC' }}
      filters={<ItemFilter />}
      perPage={10}
      {...props}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        <TextField source='item_number' />
        <TextField source='description' />
        <ChipField source='type_description' label='Item Type' />
        <ChipField source='box_name' />
        <TextField source='total_jobs_count' label='Jobs' sortable={false} />
        <TextField source='number_of_pcs_per_box' label='Pcs/Box' />
        <FunctionField
          source='ink_cost'
          label='Ink Cost($)'
          render={
            record => {
              return <span>${roundNumber(record.ink_cost)}</span>
          }}
        />
        <FunctionField
          source='box_cost'
          label='Box Cost($)'
          render={
            record => {
              return <span>${roundNumber(record.box_cost)}</span>
          }}
        />
        <FunctionField
          source='secondary_box_cost'
          label='Box 2 Cost($)'
          render={
            record => {
              return <span>${roundNumber(record.secondary_box_cost)}</span>
          }}
        />
        <FunctionField
          source='total_price_cost'
          label='Price Cost($)'
          render={
            record => {
              return <span>${roundNumber(record.total_price_cost)}</span>
          }}
        />
        <FunctionField
          source='total_inventory_cost'
          label='Inventory Cost($)'
          render={
            record => {
              return <span>${roundNumber(record.total_inventory_cost)}</span>
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
