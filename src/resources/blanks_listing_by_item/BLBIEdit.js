import { Edit, ListButton, SimpleForm, TextInput, TopToolbar, required, useEditController } from 'react-admin'
import AddBlankModal from '../../components/AddBlankModal'
import CopyBlankModal from '../../components/CopyBlankModal'
import ListingItemCost from '../../components/ListingItemCost'
import { isAdmin, isModifyPermission } from '../../helpers/functions'

export const BLBIEdit = (props) => {
  const { record } = useEditController(props)

  if (!record) {
    return <div style={{ padding: '2rem' }}>Loading...</div>
  }

  const Actions = ({ data, docNumber }) => (
    <TopToolbar>
      <ListButton />

      {isAdmin() && isModifyPermission() && (
        <AddBlankModal data={data} docNumber={docNumber} />
      )}

      {isModifyPermission() && (
        <CopyBlankModal data={data} docNumber={docNumber} />
      )}
    </TopToolbar>
  )

  return (
    <Edit
      actions={<Actions data={record} docNumber={record.item_number} />}
      {...props}
    >
      <SimpleForm
        toolbar={false}
      >
        <TextInput disabled source='id' validate={required()}/>
        <TextInput disabled source='item_number' validate={required()}/>
        <ListingItemCost
          blanksInitial={record.blanks_listing_by_item}
          resource='blanks_listing_by_items'
          docNumber={record.item_number}
        />
      </SimpleForm>
    </Edit>
  )
}
