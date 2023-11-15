import React, { useState } from 'react'
import { Create, ListButton, NumberInput, ReferenceInput, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar, TopToolbar, required, useNotify, useRedirect, useResourceContext } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

export const JobCreate = (props) => {
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
          notify(`Job ${data.id} has been created`)

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
          notify('No job has been created, please try again', 'warning')
        }
      }}
      actions={<Actions />}
      {...props}
    >
      <SimpleForm
        toolbar={<ToolbarForm />}
      >
        <NumberInput source='job_number' validate={required()}/>
        <TextInput multiline source='description' validate={required()} />
        <ReferenceInput
          label='Screen'
          reference='screens'
          source='screen_id'
          perPage={0}
          allowEmpty
        >
            <SelectInput optionText='screen_size' />
        </ReferenceInput>
        <TextInput source='wages_per_hour' label='Wages/hr ($)' validate={required()}/>
      </SimpleForm>
    </Create>
  )
}
