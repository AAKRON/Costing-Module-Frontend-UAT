import { Card } from '@mui/material'
import React from 'react'
import { Datagrid, EditButton, List, TextField } from 'react-admin'
import { GlobalVariableFilter } from './GlobalVariableFilter'

export const GlobalVariableListing = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List title='All Global Variable' {...props} filters={<GlobalVariableFilter />} exporter={false}>
      <Datagrid
        isRowSelectable={() => false}
      >
        <TextField source='id' />
        <TextField source='name' />
        <TextField source='value' />
        <EditButton />
      </Datagrid>
    </List>
  </Card>
)
