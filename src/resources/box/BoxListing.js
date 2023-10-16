import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { CreateButton, Datagrid, EditButton, FunctionField, List, TextField, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import { BoxFilter } from './BoxFilter'

export const BoxListing = (props) => {
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

  return (
    <Card style={{ margin: '2rem', padding: '1rem' }}>
      <List
        title='All Boxes'
        actions={<Actions />}
        sort={{ field: 'id', order: 'ASC' }}
        filters={<BoxFilter />}
        {...props}
      >
        <Datagrid
          isRowSelectable={() => false}
        >
          <TextField source='id' />
          <TextField source='name' />
          <FunctionField
            source='cost_per_box'
            label='Cost Per Box($)'
            render={
              record => {
                return <span>${record.cost_per_box}</span>
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
}
