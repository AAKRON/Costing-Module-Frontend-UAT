import { DisabledInput, Edit, SimpleForm, TextInput } from 'admin-on-rest/lib/mui';
import React from 'react';

const GlobalVariableTitle = ({record}) => {
	return <span>Global Variable  #{ record ? `${record.id}`: '' }</span>;
};

export const GlobalVariableEdit = (props) => (
    <Edit title={<GlobalVariableTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <DisabledInput source='name' />
            <TextInput source='value' />
        </SimpleForm>
    </Edit>
);
