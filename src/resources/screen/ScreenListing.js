import { Card } from '@mui/material'
import { Datagrid, EditButton, FunctionField, List, TextField } from 'react-admin'
import { ScreenFilter } from './ScreenFilter'

export const ScreenListing = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='All screens'
      sort={{ field: 'id', order: 'ASC' }} 
      filters={<ScreenFilter />}
      exporter={false}
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
        <EditButton />
      </Datagrid>
    </List>
  </Card>
)
