import React, { useState } from 'react'
import { BooleanInput, Create, ListButton, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required, useNotify, useRedirect, useResourceContext } from 'react-admin'
import { isModificationPermission } from '../../helpers/functions'

export const LocationCreate = (props) => {
  if(!isModificationPermission()){
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
          notify(`Location ${data.name} has been created`)

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
          notify('No location has been created, please try again', 'warning')
        }
      }}
      actions={<Actions />}
      {...props}
    >
      <SimpleForm
        toolbar={<ToolbarForm />}
      >
        <TextInput
          fullWidth
          source='name'
          validate={required()}
        />

        <BooleanInput
          fullWidth
          source='active_flag'
          defaultValue={true}
        />
      </SimpleForm>
    </Create>
  )
}
