import { Datagrid, EditButton, List, TextField } from 'admin-on-rest/lib/mui';
import React from 'react';
import PriceField from '../../components/PriceField';
import { BoxFilter } from './BoxFilter';


export const BoxListing = (props) => (
    <List title='All Boxes' sort={{ field: 'id', order: 'ASC' }} filters={<BoxFilter />} {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='name' />
            <PriceField source='cost_per_box'/>
            <EditButton />
        </Datagrid>
    </List>
);
