import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { Datagrid, EditButton, List, TextField, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import { ItemJobFilter } from './ItemJobFilter'

export const ItemJobsList = (props) => {
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

  return (
    <Card style={{ margin: '2rem', padding: '1rem' }}>
      <List
        title='Items and Job'
        actions={<Actions />}
        filters={<ItemJobFilter />}
        sort={{ field: 'item_number', order: 'ASC' }}
        perPage={10}
        {...props}
      >
        <Datagrid
          isRowSelectable={() => false}
        >
          <TextField source='item_number' />
          <TextField source='description' />
          <TextField source='number_of_jobs' />
          
          <EditButton
            label={isModifyPermission() ? 'Edit' : 'View'}
            icon={isModifyPermission() ? <EditIcon /> : <ShowIcon />}
          />
        </Datagrid>
      </List>
    </Card>
  )
}
