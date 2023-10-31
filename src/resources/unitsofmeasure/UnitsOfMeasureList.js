import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { CreateButton, Datagrid, EditButton, Filter, List, TextField, TextInput, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import UnitsExportModal from './UnitsExportModal'

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

    <UnitsExportModal />
  </TopToolbar>
)

const FilterSearch = (props) => (
  <Filter {...props}>
    <TextInput label='Search by unit abbreviation' source='abbr' alwaysOn />
    <TextInput label='Search by unit name' source='name' alwaysOn />
  </Filter>
)

export const UnitsOfMeasureList = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='Units Of Measures'
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
        <TextField source='abbr' />
        
        <EditButton
          label={isModifyPermission() ? 'Edit' : 'View'}
          icon={isModifyPermission() ? <EditIcon /> : <ShowIcon />}
        />
      </Datagrid>
    </List>
  </Card>
)
