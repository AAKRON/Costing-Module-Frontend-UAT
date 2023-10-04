import { Create, NumberInput, SimpleForm, TextInput } from 'admin-on-rest/lib/mui';
import React from 'react';

export const BLBICreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <NumberInput source='item_number'/>
            <NumberInput source='blank_number'/>
            <TextInput source='mult' label='Multiplication' />
						<TextInput source='div' label='Division' />
        </SimpleForm>
    </Create>
);
