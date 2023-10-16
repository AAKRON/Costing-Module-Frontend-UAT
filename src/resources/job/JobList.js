import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { ChipField, CreateButton, Datagrid, EditButton, FunctionField, List, TextField, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import { JobFilter } from './JobFilter'

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

export const JobList = (props) => {
  return (
    <Card style={{ margin: '2rem', padding: '1rem' }}>
      <List
        title='All Jobs'
        sort={{ field: 'id', order: 'ASC' }}
        filters={<JobFilter />}
        perPage={25}
        actions={<Actions />}
        {...props}
      >
        <Datagrid
          isRowSelectable={() => false}
        >
          {/* <TextField source='id' /> */}
          <TextField source='job_number' />
          <TextField source='description' />
          
          <ChipField source='screen_size' />
          <FunctionField
            source='wages_per_hour'
            label='Wages/hr ($)'
            render={
              record => {
                return <span>${record.wages_per_hour}</span>
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
