import EditIcon from '@mui/icons-material/Edit'
import ShowIcon from '@mui/icons-material/Visibility'
import { Card } from '@mui/material'
import React from 'react'
import { CreateButton, Datagrid, EditButton, FunctionField, List, TextField, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import { RawMaterialExportModal } from './RawMaterialExportModal'
import { RawMaterialFilter } from './RawMaterialFilter'

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

    <RawMaterialExportModal />
  </TopToolbar>
)

export const RawMaterialListing = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <List
      title='RawMaterial Listing'
      actions={<Actions />}
      filters={<RawMaterialFilter />}
      {...props}
    >
      <Datagrid
        isRowSelectable={() => false}
      >
        <TextField source='id' />
        <TextField source='name' />
        <TextField source='raw_material_type' label='Type' />
        <TextField source='vendor' />
        <FunctionField
          source='cost'
          label='Cost($)'
          render={
            record => {
              return <span>${record.cost}</span>
          }}
        />
        <TextField source='unit' />
        <TextField source='color' />

        <EditButton
          label={isModifyPermission() ? 'Edit' : 'View'}
          icon={isModifyPermission() ? <EditIcon /> : <ShowIcon />}
        />
      </Datagrid>
    </List>
  </Card>
)
