import React, { useState } from 'react'
import { Create, ListButton, NumberInput, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required, useNotify, useRedirect, useResourceContext } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

export const InkCreate = (props) => {
  if(!isModifyPermission()){
    return null
  }

  const [redirectTo, setRedirectTo] = useState('list')
  const redirect = useRedirect()
  const notify = useNotify()
  const resource = useResourceContext()

  const Actions = () => (
    <TopToolbar>
        <ListButton />
    </TopToolbar>
  )

  const ToolbarForm = (props) => {
    return (
      <Toolbar {...props}>
        <SaveButton
          onClick={() => {
            setRedirectTo('list')
          }}
        />

        <SaveButton
          label='Save and Add'
          sx={{ mx: '1em' }}
          onClick={() => {
            setRedirectTo('create')
          }}
        />
      </Toolbar>
    )
  }

  return (
    <Create
      mutationOptions={{
        onSuccess: (data) => {
          notify(`Ink has been created`)

          if(redirectTo === 'create') {
            redirect(redirectTo, resource)

            setTimeout(() => {
              window.location.reload()
            }, 500)
          }

          if(redirectTo === 'list') {
            redirect(redirectTo, resource)
          }
        },
        onError: () => {
          notify('No ink has been created, please try again', 'warning')
        }
      }}
      {...props}
      actions={<Actions />}
    >
      <SimpleForm
        toolbar={<ToolbarForm />}
      >
        <TextInput fullWidth source='name' validate={required()}/>
        <NumberInput fullWidth source='ink_cost' label='Ink Cost ($)' validate={required()}/>
      </SimpleForm>
    </Create>
  )
}
