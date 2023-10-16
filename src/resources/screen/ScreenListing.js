import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { CreateButton, Datagrid, EditButton, FunctionField, List, TextField, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import { ScreenFilter } from './ScreenFilter'

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

export const ScreenListing = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='All screens'
      sort={{ field: 'id', order: 'ASC' }} 
      filters={<ScreenFilter />}
      actions={<Actions />}
      {...props}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        <TextField source='id' />
        <TextField source='screen_size' />
        <FunctionField
            source='cost'
            label='cost ($)'
            render={
              record => {
                return <span>${record.cost}</span>
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
