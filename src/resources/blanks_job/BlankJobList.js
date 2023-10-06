
import { Card } from '@mui/material'
import React from 'react'
import { Datagrid, EditButton, Filter, List, NumberInput, TextField, TextInput } from 'react-admin'

const BlanksJobFilter = (props) => (
  <Filter {...props}>
    <NumberInput
      label='Search by number of jobs'
      source='number_of_jobs'
      alwaysOn
    />
    <TextInput label='Search by description' source='description' alwaysOn />
    <NumberInput
      label='Search by blank number'
      source='blank_number'
      alwaysOn
    />
  </Filter>
)

export const BlanksJobList = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='Blanks and Job'
      sort={{ field: 'id', order: 'ASC' }}
      filters={<BlanksJobFilter />}
      perPage={100}
      {...props}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        {/* <TextField source='id' /> */}
        <TextField source='blank_number' />
        <TextField source='description' />
        <TextField source='number_of_jobs' />
        <EditButton />
      </Datagrid>
    </List>
  </Card>
)
