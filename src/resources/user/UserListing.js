
import { Card } from '@mui/material'
import React from 'react'
import { Datagrid, EditButton, List, TextField } from 'react-admin'
import { UserFilter } from './UserFilter'

export const UserListing = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List title='All users' filters={<UserFilter />} {...props}  exporter={false}>
      <Datagrid
        isRowSelectable={() => false}
      >
        <TextField source='id' />
        <TextField source='username' />
        <TextField source='role' />
        <EditButton />
      </Datagrid>
    </List>
  </Card>
)
