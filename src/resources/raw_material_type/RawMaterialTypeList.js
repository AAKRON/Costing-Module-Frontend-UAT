import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { CreateButton, Datagrid, EditButton, Filter, List, TextField, TextInput, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import { RawMaterialTypeExportModal } from './RawMaterialTypeExportModal'

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

    <RawMaterialTypeExportModal />
  </TopToolbar>
)

const FilterSearch = (props) => (
  <Filter {...props}>
    <TextInput label='Search by name' source='q' alwaysOn />
  </Filter>
)

export const RawMaterialTypeList = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='Raw Material Types'
      actions={<Actions />}
      sort={{ field: 'id', order: 'ASC' }}
      filters={<FilterSearch />}
      {...props}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        <TextField source='id' />
        <TextField source='name' />

        <EditButton
          label={isModifyPermission() ? 'Edit' : 'View'}
          icon={isModifyPermission() ? <EditIcon /> : <ShowIcon />}
        />
      </Datagrid>
    </List>
  </Card>
)
