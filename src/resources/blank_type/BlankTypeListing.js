import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { CreateButton, Datagrid, EditButton, Filter, List, NumberInput, TextField, TextInput, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

const BlankTypeFilter = (props) => (
  <Filter {...props}>
    <NumberInput
      label='Search by blank type number'
      source='type_number'
      alwaysOn
    />
    <TextInput label='Search by description' source='description' alwaysOn />
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
  </TopToolbar>
)

export const BlankTypeListing = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='Blank Types Listing'
      sort={{ field: 'id', order: 'ASC' }}
      filters={<BlankTypeFilter />}
      actions={<Actions />}
      {...props}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        {/* <TextField source='id' /> */}
        <TextField source='type_number' />
        <TextField source='description' />

        <EditButton
          label={isModifyPermission() ? 'Edit' : 'View'}
          icon={isModifyPermission() ? <EditIcon /> : <ShowIcon />}
        />
      </Datagrid>
    </List>
  </Card>
)
