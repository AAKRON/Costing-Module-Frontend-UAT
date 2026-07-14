import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { ChipField, CreateButton, Datagrid, EditButton, Filter, FunctionField, List, NumberInput, ReferenceInput, SelectInput, TextField, TextInput, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import BlankExportModal from './BlankExportModal'

const BlankFilter = (props) => (
  <Filter {...props}>
    <NumberInput
      label='Search by blank number'
      source='blank_number'
      alwaysOn
    />
    <TextInput label='Search by description' source='description' alwaysOn />
    <ReferenceInput
      label='Search by blank type'
      reference='blank_types'
      source='blank_type_id'
      perPage={0}
      alwaysOn
    >
      <SelectInput optionText='description' />
    </ReferenceInput>
    <NumberInput label='Search by cost' source='cost' alwaysOn />
    <NumberInput
      label='Search by price cost'
      source='total_blank_cost_for_price'
    />
    <NumberInput
      label='Search by inventory cost'
      source='total_blank_cost_for_inventory'
    />
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

    {isModifyPermission() && <CreateButton />}

    <BlankExportModal />
  </TopToolbar>
)

export const BlankList = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='All blanks'
      actions={<Actions />}
      sort={{ field: 'blank_number', order: 'ASC' }}
      filters={<BlankFilter />}
      perPage={10}
      {...props}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        <TextField source='blank_number' />
        <TextField source='description' />
        <ChipField source='blank_type' />
        <FunctionField
          source='cost'
          label='Cost($)'
          render={
            record => {
              return <span>${record.cost}</span>
          }}
        />
        <FunctionField
          source='total_blank_cost_for_price'
          label='Price Cost($)'
          render={
            record => {
              return <span>${record.total_blank_cost_for_price}</span>
          }}
        />
        <FunctionField
          source='total_blank_cost_for_inventory'
          label='Inventory Cost($)'
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
