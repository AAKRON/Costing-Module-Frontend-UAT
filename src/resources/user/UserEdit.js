import { DisabledInput, Edit, SelectInput, SimpleForm, TextInput } from 'admin-on-rest/lib/mui';
import React from 'react';

const UserTitle = ({record}) => {
  return <span>User #{ record ? `${record.id}`: '' }</span>;
};

export const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <TextInput source='username' />
            <SelectInput source='role' choices={[
                { id: 'admin', name: 'Admin' },
                { id: 'user', name: 'User' },
            ]} />
            <TextInput source='password' />
        </SimpleForm>
    </Edit>
);
