import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { CreateButton, Datagrid, EditButton, FunctionField, List, TextField, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import { LocationFilter } from './LocationFilter'

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

export const LocationList = (props) => {
  return (
    <Card className='card-wrapper'>
      <List
        title='All Locations'
        sort={{ field: 'id', order: 'ASC' }}
        filters={<LocationFilter />}
        perPage={10}
        actions={<Actions />}
        {...props}
      >
        <Datagrid
          isRowSelectable={() => false}
        >
          <TextField source='id' />
          <TextField source='name' />
          <FunctionField
            source='active_flag'
            render={(record) => record.active_flag ? 'Active' : 'Inactive'}
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
