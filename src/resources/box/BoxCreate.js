import React, { useState } from 'react'
import { Create, ListButton, NumberInput, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required, useNotify, useRedirect, useResourceContext } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

export const BoxCreate = (props) => {
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
          notify(`Box ${data.id} has been created`)

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
          notify('No box has been created, please try again', 'warning')
        }
      }}
      {...props}
      actions={<Actions />}
    >
      <SimpleForm
        toolbar={<ToolbarForm />}
      >
        <TextInput source='name' validate={required()}/>
        <NumberInput source='cost_per_box' label='Cost per box($)' validate={required()}/>
      </SimpleForm>
    </Create>
  )
}
