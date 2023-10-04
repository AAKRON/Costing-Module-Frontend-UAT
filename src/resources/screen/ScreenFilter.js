import React from 'react'
import { Filter, NumberInput, ReferenceInput, SelectInput } from 'react-admin'

export const ScreenFilter = (props) => (
  <Filter {...props}>
    <NumberInput label='Search by cost' source='cost' alwaysOn />
    <ReferenceInput
      label='Search by screen size'
      reference='screens'
      source='screen_id'
      perPage={0}
      alwaysOn
    >
      <SelectInput optionText='screen_size' />
    </ReferenceInput>
    <NumberInput label='Search by id' source='id' alwaysOn />
  </Filter>
);
