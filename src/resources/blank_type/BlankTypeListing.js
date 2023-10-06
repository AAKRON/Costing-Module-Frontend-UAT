import { Card } from '@mui/material'
import { Datagrid, EditButton, Filter, List, NumberInput, TextField, TextInput } from 'react-admin'

const BlankTypeFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search by description' source='description' alwaysOn />
    <NumberInput
      label='Search by blank type number'
      source='type_number'
      alwaysOn
    />
  </Filter>
)

export const BlankTypeListing = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='Blank Types Listing'
      sort={{ field: 'id', order: 'ASC' }}
      filters={<BlankTypeFilter />}
      exporter={false}
      {...props}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        {/* <TextField source='id' /> */}
        <TextField source='type_number' />
        <TextField source='description' />
        <EditButton />
      </Datagrid>
    </List>
  </Card>
)
