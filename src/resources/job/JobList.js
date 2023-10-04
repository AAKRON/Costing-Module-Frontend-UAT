import { Card } from '@mui/material'
import React from 'react'
import { ChipField, Datagrid, EditButton, FunctionField, List, TextField } from 'react-admin'
import { JobFilter } from './JobFilter'

export const JobList = (props) => {
  return (
    <Card style={{ margin: '2rem', padding: '1rem' }}>
      <List
        title='All Jobs'
        sort={{ field: 'id', order: 'ASC' }}
        filters={<JobFilter />}
        perPage={25}
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
    
          <EditButton />
        </Datagrid>
      </List>
    </Card>
  )
}
