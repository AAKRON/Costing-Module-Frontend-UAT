import { Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from 'react-admin'


export const JobEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source='id' validate={required()}/>
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
        <NumberInput label='Wages/hr ($)' source='wages_per_hour' validate={required()} />
      </SimpleForm>
    </Edit>
  )
}
