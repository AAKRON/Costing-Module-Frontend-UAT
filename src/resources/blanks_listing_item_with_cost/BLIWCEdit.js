import React from 'react'
import { Edit, ListButton, NumberInput, SimpleForm, TextInput, TopToolbar, useEditController } from 'react-admin'
import AddBlankModal from '../../components/AddBlankModal'
import ListingItemCost from '../../components/ListingItemCost'
import { isAdmin, isModifyPermission } from '../../helpers/functions'

const Actions = ({ data, docNumber }) => (
  <TopToolbar>
    <ListButton />

    {isAdmin() && isModifyPermission() && (
      <AddBlankModal data={data} docNumber={docNumber} />
    )}
  </TopToolbar>
)

const BLIWCEdit = (props) => {
  const { record } = useEditController(props)

  if (!record) {
    return null
  }

  return (
    <Edit
      actions={<Actions data={record} docNumber={record.item_number} />}
      {...props}
    >
      <SimpleForm
        toolbar={false}
      >
        <TextInput disabled source='id' />
        <NumberInput disabled source='item_number' />
        <ListingItemCost
          blanksInitial={record.blanks_listing_by_item}
          id={record.id}
          docNumber={record.item_number}
        />
      </SimpleForm>
    </Edit>
  )
}

export { BLIWCEdit }

