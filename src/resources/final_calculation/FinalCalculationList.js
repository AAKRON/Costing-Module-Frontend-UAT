import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { CreateButton, Datagrid, EditButton, FunctionField, List, TextField, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import { FinalCalculationFilter } from './FinalCalculationFilter'

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

export const FinalCalculationList = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='Final Calculations'
      filters={<FinalCalculationFilter />}
      sort={{ field: 'blank_number', order: 'ASC' }}
      perPage={10}
      actions={<Actions />}
      {...props}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        <TextField source='blank_number' />
        <TextField source='blank_name' />
        <TextField source='color_description' label='Color' />
        <TextField source='raw_material' />
        <FunctionField
          source='raw_calculated'
          label='Raw Calculated ($)'
          render={
            record => {
              return <span>${record.raw_calculated}</span>
          }}
        />
        <FunctionField
          source='cost_of_colorant_or_lacquer'
          label='Cost of Colorant ($)'
          render={
            record => {
              return <span>${record.cost_of_colorant_or_lacquer}</span>
          }}
        />
        <FunctionField
          source='total'
          label='Total ($)'
          render={
            record => {
              return <span>${record.total}</span>
          }}
        />
        <FunctionField
          source='ave_cost'
          label='Avg Cost ($)'
          render={
            record => {
              return <span>${record.ave_cost}</span>
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
