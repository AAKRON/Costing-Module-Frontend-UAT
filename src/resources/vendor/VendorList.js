import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { CreateButton, Datagrid, EditButton, Filter, List, TextField, TextInput, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import { VendorExportModal } from './VendorExportModal'

export const VendorList = (props) => {
  const FilterSearch = (props) => (
    <Filter {...props}>
      <TextInput label='Search by vendor code ' source='code' alwaysOn />
      <TextInput label='Search by vendor name ' source='name' alwaysOn />
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
  
      <VendorExportModal />
    </TopToolbar>
  )

  return (
    <Card style={{ margin: '2rem', padding: '1rem' }}>
      <List
        title='All Vendors'
        sort={{ field: 'id', order: 'ASC' }}
        actions={<Actions />}
        filters={<FilterSearch />}
        {...props}
      >
        <Datagrid
          isRowSelectable={() => false}
        >
          <TextField source='id' />
          <TextField source='name' />
          <TextField source='code' />

          <EditButton
            label={isModifyPermission() ? 'Edit' : 'View'}
            icon={isModifyPermission() ? <EditIcon /> : <ShowIcon />}
          />
        </Datagrid>
      </List>
    </Card>
  )
}
