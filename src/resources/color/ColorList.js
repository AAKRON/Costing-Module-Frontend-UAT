import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { CreateButton, Datagrid, EditButton, Filter, FunctionField, List, NumberInput, TextField, TextInput, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import { ColorExportModal } from './ColorExportModal'

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

    <ColorExportModal />
  </TopToolbar>
)

const FilterSearch = (props) => (
  <Filter {...props}>
    <NumberInput label='Search by color cost' source='cost_of_color' alwaysOn />
    <TextInput label='Search by color name' source='name' alwaysOn />
    <TextInput label='Search by color code' source='code' alwaysOn />
  </Filter>
)

export const ColorList = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='All Colors'
      actions={<Actions />}
      sort={{ field: 'id', order: 'ASC' }}
      filters={<FilterSearch />}
      {...props}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        <TextField source='id' />
        <TextField source='code' />
        <TextField source='name' />
        <FunctionField
          source='cost_of_color'
          label='Cost($)'
          render={
            record => {
              return <span>${record.cost_of_color}</span>
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
