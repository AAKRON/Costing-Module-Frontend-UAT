import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { CreateButton, Datagrid, EditButton, FunctionField, List, TextField, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import { InkFilter } from './InkFilter'

const roundNumber = (n) => parseFloat(n || 0).toFixed(4)

export const InkListing = (props) => {
  if(!isModifyPermission()) return null

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

  return (
    <Card className='card-wrapper'>
      <List
        title='All Inks'
        actions={<Actions />}
        sort={{ field: 'id', order: 'ASC' }}
        filters={<InkFilter />}
        {...props}
      >
        <Datagrid
          isRowSelectable={() => false}
        >
          <TextField source='id' />
          <TextField source='name' />
          <FunctionField
            source='ink_cost'
            label='Ink Cost($)'
            render={
              record => {
                return <span>${roundNumber(record.ink_cost)}</span>
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
}
