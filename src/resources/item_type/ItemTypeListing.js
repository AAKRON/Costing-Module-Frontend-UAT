import { Datagrid, EditButton, List, TextField } from 'admin-on-rest/lib/mui';
import React from 'react';

export const ItemTypeListing = (props) => (
    <List title='Item Types Listing' sort={{ field: 'id', order: 'ASC' }} {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='type_number' />
            <TextField source='description' />
            <EditButton />
        </Datagrid>
    </List>
);
