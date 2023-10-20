import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { CreateButton, Datagrid, EditButton, List, TextField, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import { BLBIFilter } from './BLBIFilter'

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

export const BLBIListing = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='Blanks Listing By Item'
      actions={<Actions />}
      sort={{ field: 'id', order: 'ASC' }}
      filters={<BLBIFilter />}
      perPage={50}
      {...props}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        <TextField source='id' />
        <TextField source='item_number' />
        <TextField source='blank_number' />
        <TextField source='mult' label='Multiplication' />
        <TextField source='div' label='Division' />

        <EditButton
          label={isModifyPermission() ? 'Edit' : 'View'}
          icon={isModifyPermission() ? <EditIcon /> : <ShowIcon />}
        />
      </Datagrid>
    </List>
  </Card>
)
