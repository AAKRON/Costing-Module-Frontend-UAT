import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import React from 'react'
import { CreateButton, Datagrid, EditButton, List, TextField, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

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

export const ItemTypeListing = (props) => (
  <List
    actions={<Actions />}
    title='Item Types Listing'
    sort={{ field: 'id', order: 'ASC' }}
    {...props}
  >
    <Datagrid>
      <TextField source='id' />
      <TextField source='type_number' />
      <TextField source='description' />
      
      <EditButton
        label={isModifyPermission() ? 'Edit' : 'View'}
        icon={isModifyPermission() ? <EditIcon /> : <ShowIcon />}
      />
    </Datagrid>
  </List>
)
