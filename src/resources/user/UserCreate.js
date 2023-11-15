import React, { useState } from 'react'
import { Create, ListButton, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar, TopToolbar, required, useNotify, useRedirect, useResourceContext } from 'react-admin'

export const UserCreate = (props) => {
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
          notify(`User ${data.id} has been created`)

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
          notify('No user has been created, please try again', 'warning')
        }
      }}
      actions={<Actions />}
      {...props}
    >
      <SimpleForm
        toolbar={<ToolbarForm />}
      >
        <TextInput source='username' validate={required()}/>
        <TextInput source='password' type='password' validate={required()}/>
        <SelectInput source='role' validate={required()} choices={[
            { id: 'admin', name: 'Admin' },
            { id: 'user', name: 'User' },
        ]} />
      </SimpleForm>
    </Create>
  )
}
