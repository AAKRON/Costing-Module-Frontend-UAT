import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { CreateButton, Datagrid, EditButton, List, TextField, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import { GlobalVariableFilter } from './GlobalVariableFilter'

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

export const GlobalVariableListing = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='All Global Variable'
      {...props}
      actions={<Actions />}
      filters={<GlobalVariableFilter />}
      exporter={false}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        <TextField source='id' />
        <TextField source='name' />
        <TextField source='value' />
        
        <EditButton
          label={isModifyPermission() ? 'Edit' : 'View'}
          icon={isModifyPermission() ? <EditIcon /> : <ShowIcon />}
        />
      </Datagrid>
    </List>
  </Card>
)
