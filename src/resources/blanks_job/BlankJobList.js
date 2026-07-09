import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { Datagrid, EditButton, Filter, List, NumberInput, TextField, TextInput } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

const BlanksJobFilter = (props) => (
  <Filter {...props}>
    <NumberInput
      label='Search by blank number'
      source='blank_number'
      alwaysOn
    />
    <TextInput label='Search by description' source='description' alwaysOn />
    <NumberInput
      label='Search by number of jobs'
      source='number_of_jobs'
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
      actions={false}
      perPage={10}
      {...props}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        {/* <TextField source='id' /> */}
        <TextField source='blank_number' />
        <TextField source='description' />
        <TextField source='number_of_jobs' />

        <EditButton
          label={isModifyPermission() ? 'Edit' : 'View'}
          icon={isModifyPermission() ? <EditIcon /> : <ShowIcon />}
        />
      </Datagrid>
    </List>
  </Card>
)
